import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { contentAPI } from '../../utils/supabase/client';
import { RichTextToolbar } from './RichTextToolbar';
import { EDITOR_CONFIG } from './RichTextEditorConstants';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "הזינו תוכן..." 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUserInput, setHasUserInput] = useState(false);

  // Clean pasted content from Word/other sources
  const cleanPastedContent = (html: string): string => {
    // Remove Word-specific tags and attributes
    let cleaned = html
      // Remove Word XML namespaces and tags
      .replace(/<\/?[ovwxp]:[^>]*>/gi, '')
      // Remove Word-specific comments
      .replace(/<!--[\s\S]*?-->/gi, '')
      // Remove mso- styles and Word-specific classes
      .replace(/\s*mso-[^:;]+:[^;]+;?/gi, '')
      .replace(/\s*class="[^"]*Mso[^"]*"/gi, '')
      .replace(/\s*class="[^"]*Word[^"]*"/gi, '')
      // Remove font-family with weird Word fonts
      .replace(/font-family:\s*["']?[^,"';]*Cambria[^,"';]*["']?[^;]*/gi, '')
      .replace(/font-family:\s*["']?[^,"';]*Times[^,"';]*["']?[^;]*/gi, '')
      .replace(/font-family:\s*["']?[^,"';]*Calibri[^,"';]*["']?[^;]*/gi, '')
      // Remove excessive spans and formatting
      .replace(/<span[^>]*>\s*<\/span>/gi, '')
      .replace(/<span[^>]*style=""[^>]*>/gi, '<span>')
      .replace(/<span[^>]*>\s*(<[^>]*>)*\s*<\/span>/gi, '')
      // Remove Word-specific div styling
      .replace(/<div[^>]*style="[^"]*mso[^"]*"[^>]*>/gi, '<div>')
      .replace(/<div[^>]*class="[^"]*Mso[^"]*"[^>]*>/gi, '<div>')
      // Clean up paragraph breaks and spacing
      .replace(/<p[^>]*>\s*<\/p>/gi, '')
      .replace(/(<\/p>)\s*(<p[^>]*>)/gi, '$1\n$2')
      // Remove empty attributes
      .replace(/\s+style=""/gi, '')
      .replace(/\s+class=""/gi, '')
      // Remove Word line height and spacing
      .replace(/line-height:\s*[^;]*;?/gi, '')
      .replace(/margin:\s*[^;]*;?/gi, '')
      .replace(/padding:\s*[^;]*;?/gi, '')
      // Normalize whitespace and line breaks
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    // Convert to proper RTL structure
    if (cleaned && !cleaned.includes('dir=')) {
      // Convert paragraphs to RTL
      cleaned = cleaned.replace(/<p[^>]*>/gi, '<p dir="rtl" style="text-align: right;">');
      // Convert divs that contain text to RTL paragraphs
      cleaned = cleaned.replace(/<div[^>]*>([^<]+)<\/div>/gi, '<p dir="rtl" style="text-align: right;">$1</p>');
    }

    // If still no proper structure, wrap in RTL paragraph
    if (cleaned && !cleaned.includes('<p') && !cleaned.includes('<ol') && !cleaned.includes('<ul')) {
      cleaned = `<p dir="rtl" style="text-align: right;">${cleaned}</p>`;
    }

    return cleaned;
  };

  // Convert numbered text to proper ordered list
  const convertNumberedTextToList = (text: string): string => {
    // First, normalize the text - remove hidden chars and extra whitespace
    let normalizedText = text
      .replace(/\r\n/g, '\n') // Convert Windows line breaks
      .replace(/\r/g, '\n')   // Convert Mac line breaks
      .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
      .replace(/\u2009/g, ' ') // Replace thin spaces
      .replace(/\u200B/g, '')  // Remove zero-width spaces
      .replace(/[\u200C\u200D]/g, '') // Remove zero-width non-joiner/joiner
      .replace(/\t/g, ' ')     // Convert tabs to spaces
      .replace(/\u2028/g, '\n') // Replace line separator
      .replace(/\u2029/g, '\n') // Replace paragraph separator
      .trim();
    
    console.log('Normalized text:', JSON.stringify(normalizedText));
    
    // Split into lines, keeping empty lines for structure
    const allLines = normalizedText.split('\n');
    const listItems: string[] = [];
    let currentItem = '';
    let foundNumberedItems = false;
    
    console.log('All lines:', allLines);
    
    for (let i = 0; i < allLines.length; i++) {
      let line = allLines[i].trim();
      
      // Skip completely empty lines
      if (!line) continue;
      
      // Much more flexible regex for numbered items - handle TAB and multiple spaces
      // Matches: "1.", "1.\t", "1.   ", ".1", etc. with any amount of whitespace after
      const numberedMatch = line.match(/^(\d+[\.\)\-]\s*|\.\s*\d+\s*)\s*(.*)$/);
      
      console.log(`Line ${i}: "${line}" (length: ${line.length})`);
      console.log(`Line bytes:`, Array.from(line).map(c => c.charCodeAt(0)));
      console.log(`Match result:`, numberedMatch ? 'MATCHED' : 'NO MATCH');
      
      if (numberedMatch) {
        // Found a numbered item
        foundNumberedItems = true;
        
        // If we have a previous item, save it
        if (currentItem.trim()) {
          listItems.push(currentItem.trim());
          console.log('Added item:', currentItem.trim());
        }
        
        // Start new item with the content after the number
        currentItem = numberedMatch[2] || '';
        console.log('Started new item:', currentItem);
        
      } else if (foundNumberedItems && line.length > 0) {
        // We're in a list and this is continuation of current item
        if (currentItem) {
          currentItem += ' ' + line;
        } else {
          currentItem = line;
        }
        console.log('Continued item:', currentItem);
      }
    }
    
    // Add the last item
    if (currentItem.trim()) {
      listItems.push(currentItem.trim());
      console.log('Added final item:', currentItem.trim());
    }
    
    console.log('Final list items:', listItems);
    
    // Only convert if we found numbered items and have multiple items OR at least one item
    if (foundNumberedItems && listItems.length > 0) {
      const htmlItems = listItems.map((item, index) => {
        console.log(`Creating HTML for item ${index + 1}:`, item);
        return `<li dir="rtl" style="text-align: right; position: relative; padding-right: 1.5em; margin-bottom: 0.5em;">${item}</li>`;
      }).join('');
      
      const result = `<ol dir="rtl" style="text-align: right; list-style: none; padding: 0; margin: 1em 0;" class="rich-text-numbered-list">${htmlItems}</ol>`;
      console.log('Generated HTML:', result);
      return result;
    }
    
    // If not a numbered list, return as paragraphs
    const lines = normalizedText.split('\n').filter(line => line.trim());
    return lines.map(line => 
      `<p dir="rtl" style="text-align: right;">${line.trim()}</p>`
    ).join('');
  };

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const clipboardData = e.clipboardData;
    let pastedContent = '';
    
    console.log('Paste event triggered');
    console.log('Available types:', clipboardData.types);
    
    // Always try both HTML and plain text to handle Word content properly
    const htmlContent = clipboardData.getData('text/html');
    const plainTextContent = clipboardData.getData('text/plain');
    
    console.log('Got HTML content:', htmlContent.substring(0, 300));
    console.log('Got plain text content:', plainTextContent.substring(0, 300));

    // Prefer HTML if available and contains actual content, otherwise use plain text
    if (htmlContent && htmlContent.trim() && htmlContent.includes('<')) {
      pastedContent = htmlContent;
      console.log('Using HTML content');
    } else if (plainTextContent && plainTextContent.trim()) {
      pastedContent = plainTextContent;
      console.log('Using plain text content');
    }

    if (pastedContent) {
      // If it's plain text, check for numbered content and convert if needed
      if (!pastedContent.includes('<')) {
        console.log('Processing as plain text');
        // Check if it contains numbered items with more flexible pattern including TAB
        const numberedPattern = /^\s*\d+[\.\)\-][\s\t]+/gm;
        if (numberedPattern.test(pastedContent)) {
          console.log('Found numbered pattern in plain text');
          pastedContent = convertNumberedTextToList(pastedContent);
        } else {
          console.log('No numbered pattern, converting to paragraphs');
          // Convert line breaks to paragraph breaks for regular text
          pastedContent = pastedContent
            .split('\n')
            .filter(line => line.trim())
            .map(line => `<p dir="rtl" style="text-align: right;">${line.trim()}</p>`)
            .join('');
        }
      } else {
        console.log('Processing as HTML content');
        // Clean HTML content first
        const originalPasted = pastedContent;
        pastedContent = cleanPastedContent(pastedContent);
        console.log('Cleaned HTML from:', originalPasted.substring(0, 200));
        console.log('Cleaned HTML to:', pastedContent.substring(0, 200));
        
        // Extract text content and check for numbered items
        const textContent = pastedContent
          .replace(/<[^>]*>/g, '\n')  // Replace tags with newlines
          .replace(/&nbsp;/g, ' ')    // Replace HTML entities
          .replace(/&#160;/g, ' ')    // Another non-breaking space
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\t/g, ' ')        // Convert tabs to spaces
          .replace(/\s+/g, ' ')       // Normalize whitespace
          .trim();
        
        console.log('Extracted text content:', JSON.stringify(textContent));
        
        // More flexible numbered pattern for extracted text including TAB
        const numberedPattern = /^\s*\d+[\.\)\-][\s\t]+/gm;
        if (numberedPattern.test(textContent)) {
          console.log('Found numbered pattern in HTML text, converting to list');
          pastedContent = convertNumberedTextToList(textContent);
        } else if (textContent) {
          // If we have text but no numbered pattern, create RTL paragraphs
          console.log('No numbered pattern in HTML text, creating RTL paragraphs');
          const lines = textContent.split('\n').filter(line => line.trim());
          if (lines.length > 0) {
            pastedContent = lines.map(line => 
              `<p dir="rtl" style="text-align: right;">${line.trim()}</p>`
            ).join('');
          }
        }
      }
      
      console.log('Final processed content:', pastedContent);
      
      // Insert at cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = pastedContent;
        
        // Insert each child node
        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        
        range.insertNode(fragment);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // After inserting, add manual numbering to any ordered lists
        setTimeout(() => {
          if (editorRef.current) {
            const newOrderedLists = editorRef.current.querySelectorAll('ol.rich-text-numbered-list');
            newOrderedLists.forEach(list => {
              const listItems = list.querySelectorAll('li');
              listItems.forEach((li, index) => {
                // Remove existing list numbers if any
                const existingNumbers = li.querySelectorAll('.list-number');
                existingNumbers.forEach(num => num.remove());
                
                // Add manual numbering with correct format (.1, .2, etc.)
                const numberSpan = document.createElement('span');
                numberSpan.className = 'list-number';
                numberSpan.textContent = `.${index + 1}`;
                numberSpan.style.position = 'absolute';
                numberSpan.style.fontWeight = 'bold';
                numberSpan.style.color = '#101828';
                numberSpan.style.display = 'inline-block';
                numberSpan.style.width = '1em';
                numberSpan.style.right = '0';
                numberSpan.style.marginRight = '0.25em';
                
                li.insertBefore(numberSpan, li.firstChild);
              });
            });
          }
        }, 100);
      }
      
      setHasUserInput(true);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };
  
  // טיפול בעדכון תוכן מבלי לאבד את מיקום הסמן ויישור
  useEffect(() => {
    // אם המשתמש עורך כרגע, לא נעדכן את התוכן
    if (hasUserInput || isFocused || isUpdating) {
      return;
    }
    
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // בדיקה אם יש הבדל משמעותי (לא רק רווחים או עיצוב קל)
      const currentClean = editorRef.current.innerHTML.replace(/\s+/g, ' ').trim();
      const valueClean = value.replace(/\s+/g, ' ').trim();
      
      // אם אין הבדל משמעותי, לא נעדכן
      if (currentClean === valueClean) {
        return;
      }
      
      // שמירת מיקום סמן ויישור נוכחי
      const selection = window.getSelection();
      let range = null;
      let startOffset = 0;
      let endOffset = 0;
      
      if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        startOffset = range.startOffset;
        endOffset = range.endOffset;
      }
      
      // עדכון התוכן מבלי לכפות יישור
      setIsUpdating(true);
      editorRef.current.innerHTML = value;
      
      // החזרת הסמן למיקום הנכון
      if (selection && range && editorRef.current.firstChild) {
        try {
          const newRange = document.createRange();
          const textNode = editorRef.current.firstChild;
          newRange.setStart(textNode, Math.min(startOffset, textNode.textContent?.length || 0));
          newRange.setEnd(textNode, Math.min(endOffset, textNode.textContent?.length || 0));
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (e) {
          // אם יש שגיאה בהחזרת הסמן, נתעלם ונמשיך
        }
      }
      
      setTimeout(() => setIsUpdating(false), 100);
    }
  }, [value, isFocused, isUpdating, hasUserInput]);

  // איפוס מצב הקלט כשמקבלים תוכן חדש מבחוץ (למשל אחרי שמירה)
  useEffect(() => {
    if (value && !hasUserInput && !isFocused) {
      setHasUserInput(false);
    }
  }, [value]);

  // Fix existing numbered lists when content is loaded
  useEffect(() => {
    if (editorRef.current && value && !hasUserInput && !isFocused) {
      const fixExistingLists = () => {
        const allOrderedLists = editorRef.current?.querySelectorAll('ol');
        if (allOrderedLists) {
          allOrderedLists.forEach(list => {
            const currentDir = list.getAttribute('dir') || editorRef.current?.getAttribute('dir') || 'rtl';
            const listItems = list.querySelectorAll('li');
            
            listItems.forEach((li, index) => {
              // Remove existing list numbers if any
              const existingNumbers = li.querySelectorAll('.list-number');
              existingNumbers.forEach(num => num.remove());
              
              // Add manual numbering with correct format (.1, .2, etc.)
              const numberSpan = document.createElement('span');
              numberSpan.className = 'list-number';
              numberSpan.textContent = `.${index + 1}`;
              numberSpan.style.position = 'absolute';
              numberSpan.style.fontWeight = 'bold';
              numberSpan.style.color = '#101828';
              numberSpan.style.display = 'inline-block';
              numberSpan.style.width = '1em';
              
              if (currentDir === 'rtl') {
                numberSpan.style.right = '0';
                numberSpan.style.marginRight = '0.25em';
              } else {
                numberSpan.style.left = '0';
                numberSpan.style.marginLeft = '0.25em';
              }
              
              li.insertBefore(numberSpan, li.firstChild);
            });
            
            // Ensure list has proper styling
            (list as HTMLElement).style.listStyle = 'none';
            (list as HTMLElement).style.padding = '0';
            (list as HTMLElement).style.counterReset = 'hebrew-counter';
          });
        }
      };
      
      // Small delay to ensure DOM is updated
      setTimeout(fixExistingLists, 100);
    }
  }, [value, hasUserInput, isFocused]);

  // שמירת מיקום הסמן והעדכון מבלי לכפות יישור
  const handleInput = useCallback(() => {
    if (editorRef.current && !isUpdating) {
      setHasUserInput(true);
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange, isUpdating]);

  const handleFocus = () => {
    setIsFocused(true);
    setHasUserInput(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // איפוס מצב הקלט של המשתמש אחרי delay קטן
    setTimeout(() => {
      setHasUserInput(false);
    }, 500);
  };

  // פונקציות פקודות עריכה
  const executeCommand = useCallback((command: string, value?: string) => {
    try {
      setHasUserInput(true);
      document.execCommand(command, false, value);
      if (editorRef.current) {
        editorRef.current.focus();
        onChange(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.error('Error executing command:', command, error);
    }
  }, [onChange]);

  const insertList = useCallback((ordered: boolean = false) => {
    try {
      setHasUserInput(true);
      const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
      document.execCommand(command, false);
      
      // After creating the list, ensure proper styling for RTL
      if (editorRef.current) {
        const currentDir = editorRef.current.getAttribute('dir') || 'rtl';
        const allLists = editorRef.current.querySelectorAll('ul, ol');
        
        allLists.forEach(list => {
          // Apply CSS classes instead of inline styles for proper numbering
          if (ordered && list.tagName.toLowerCase() === 'ol') {
            // For ordered lists, use CSS classes to ensure counters work
            list.className = 'rich-text-numbered-list';
            (list as HTMLElement).style.listStyle = 'none';
            (list as HTMLElement).style.padding = '0';
            (list as HTMLElement).style.counterReset = 'hebrew-counter';
          } else {
            // For unordered lists
            (list as HTMLElement).style.listStyle = 'none';
            (list as HTMLElement).style.padding = '0';
          }
          
          // Set direction
          list.setAttribute('dir', currentDir);
          if (currentDir === 'rtl') {
            (list as HTMLElement).style.textAlign = 'right';
            (list as HTMLElement).style.direction = 'rtl';
          } else {
            (list as HTMLElement).style.textAlign = 'left';
            (list as HTMLElement).style.direction = 'ltr';
          }
          
          // Style list items and add manual numbering
          const listItems = list.querySelectorAll('li');
          listItems.forEach((li, index) => {
            (li as HTMLElement).style.position = 'relative';
            (li as HTMLElement).style.marginBottom = '0.5em';
            (li as HTMLElement).style.lineHeight = '1.6';
            
            if (currentDir === 'rtl') {
              (li as HTMLElement).style.paddingRight = '1.5em';
              (li as HTMLElement).style.paddingLeft = '0';
              (li as HTMLElement).style.textAlign = 'right';
              (li as HTMLElement).style.direction = 'rtl';
            } else {
              (li as HTMLElement).style.paddingLeft = '1.5em';
              (li as HTMLElement).style.paddingRight = '0';
              (li as HTMLElement).style.textAlign = 'left';
              (li as HTMLElement).style.direction = 'ltr';
            }

            // Add manual numbering for ordered lists to ensure it works correctly
            if (ordered && list.tagName.toLowerCase() === 'ol') {
              // Remove any existing numbering elements
              const existingNumbers = li.querySelectorAll('.list-number');
              existingNumbers.forEach(num => num.remove());
              
              // Add manual numbering with correct format (.1, .2, etc.)
              const numberSpan = document.createElement('span');
              numberSpan.className = 'list-number';
              numberSpan.textContent = `.${index + 1}`;
              numberSpan.style.position = 'absolute';
              numberSpan.style.fontWeight = 'bold';
              numberSpan.style.color = '#101828';
              numberSpan.style.display = 'inline-block';
              numberSpan.style.width = '1em';
              
              if (currentDir === 'rtl') {
                numberSpan.style.right = '0';
                numberSpan.style.marginRight = '0.25em';
              } else {
                numberSpan.style.left = '0';
                numberSpan.style.marginLeft = '0.25em';
              }
              
              li.insertBefore(numberSpan, li.firstChild);
            }
          });
        });
        
        editorRef.current.focus();
        onChange(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.error('Error inserting list:', error);
    }
  }, [onChange]);

  const setHeading = useCallback((level: number) => {
    if (level === 0) {
      executeCommand('formatBlock', 'div');
    } else {
      executeCommand('formatBlock', `h${level}`);
    }
  }, [executeCommand]);

  const insertLink = useCallback(() => {
    const url = prompt('הזינו כתובת URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  }, [executeCommand]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    setHasUserInput(true);
    
    try {
      const result = await contentAPI.uploadImage(file);
      
      // הוספת תמונה במיקום הסמן
      const img = document.createElement('img');
      img.src = result.imageUrl;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.margin = '10px 0';
      img.style.borderRadius = '8px';
      img.style.display = 'block';
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);
        
        // הוספת פסקה חדשה אחרי התמונה
        const br = document.createElement('br');
        range.setStartAfter(img);
        range.insertNode(br);
        range.setStartAfter(br);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (editorRef.current) {
        editorRef.current.appendChild(img);
      }
      
      handleInput();
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('שגיאה בהעלאת התמונה');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  // טיפול בקיצורי מקלדת
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // CTRL+Z לביטול
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      setHasUserInput(true);
      document.execCommand('undo');
      return;
    }
    
    // CTRL+Y או CTRL+SHIFT+Z לחזרה
    if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
      e.preventDefault();
      setHasUserInput(true);
      document.execCommand('redo');
      return;
    }

    // CTRL+B למודגש
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      executeCommand('bold');
      return;
    }

    // CTRL+I לנטוי
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      executeCommand('italic');
      return;
    }

    // CTRL+U לקו תחתון
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      executeCommand('underline');
      return;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {error && (
        <Alert className="m-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      
      <RichTextToolbar
        onExecuteCommand={executeCommand}
        onInsertList={insertList}
        onSetHeading={setHeading}
        onInsertLink={insertLink}
        onImageUpload={handleImageUpload}
        isUploading={isUploading}
        editorRef={editorRef}
      />

      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="min-h-[300px] p-4 prose prose-lg max-w-none focus:outline-none focus:ring-2 focus:ring-[#905e26] focus:ring-opacity-50 rich-text-editor"
          dir="rtl"
          style={{
            fontFamily: EDITOR_CONFIG.fontFamily,
            fontSize: EDITOR_CONFIG.defaultFontSize,
            lineHeight: EDITOR_CONFIG.lineHeight,
            textAlign: 'right', // התחלה בעברית כברירת מחדל
            unicodeBidi: 'plaintext'
          }}
          suppressContentEditableWarning={true}
          spellCheck={false}
        />
        
        {!value && !isFocused && (
          <div 
            className="absolute top-4 right-4 text-gray-400 pointer-events-none text-right" 
            style={{ 
              fontFamily: EDITOR_CONFIG.fontFamily,
              direction: 'rtl'
            }}
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}