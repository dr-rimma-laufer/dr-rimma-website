import React from 'react';
import { Button } from '../ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  Link, 
  Image, 
  AlignRight, 
  AlignCenter, 
  AlignLeft,
  Languages 
} from 'lucide-react';
import { FONT_SIZES, FONT_FAMILIES, HEADING_OPTIONS } from './RichTextEditorConstants';

interface RichTextToolbarProps {
  onExecuteCommand: (command: string, value?: string) => void;
  onInsertList: (ordered?: boolean) => void;
  onSetHeading: (level: number) => void;
  onInsertLink: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploading: boolean;
  editorRef?: React.RefObject<HTMLDivElement>;
}

export function RichTextToolbar({ 
  onExecuteCommand,
  onInsertList,
  onSetHeading,
  onInsertLink,
  onImageUpload,
  isUploading,
  editorRef 
}: RichTextToolbarProps) {

  const toggleList = (ordered: boolean) => {
    if (editorRef?.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node = selection.anchorNode;
        
        // Find if we're inside a list
        while (node && node !== editorRef.current) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName?.toLowerCase() === 'li') {
              const parentList = element.parentElement;
              if (parentList && (parentList.tagName?.toLowerCase() === 'ul' || parentList.tagName?.toLowerCase() === 'ol')) {
                // We're in a list - check if it matches the type we want
                const isCurrentlyOrdered = parentList.tagName?.toLowerCase() === 'ol';
                if (isCurrentlyOrdered === ordered) {
                  // Same type - remove the list by executing the command again
                  const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
                  document.execCommand(command, false);
                  return;
                } else {
                  // Different type - convert the list
                  onInsertList(ordered);
                  return;
                }
              }
            }
          }
          node = node.parentNode;
        }
      }
    }
    
    // Not in a list - create a new one
    onInsertList(ordered);
  };

  const toggleDirection = () => {
    if (editorRef?.current) {
      const currentDir = editorRef.current.getAttribute('dir') || 'rtl';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      editorRef.current.setAttribute('dir', newDir);
      
      // Update text-align based on direction
      if (newDir === 'rtl') {
        editorRef.current.style.textAlign = 'right';
      } else {
        editorRef.current.style.textAlign = 'left';
      }
      
      // Update existing lists direction and styling
      const lists = editorRef.current.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.setAttribute('dir', newDir);
        (list as HTMLElement).style.listStyle = 'none';
        (list as HTMLElement).style.padding = '0';
        
        if (newDir === 'rtl') {
          (list as HTMLElement).style.textAlign = 'right';
          (list as HTMLElement).style.direction = 'rtl';
        } else {
          (list as HTMLElement).style.textAlign = 'left';
          (list as HTMLElement).style.direction = 'ltr';
        }
        
        // Update list items and renumber if needed
        const listItems = list.querySelectorAll('li');
        listItems.forEach((li, index) => {
          (li as HTMLElement).style.position = 'relative';
          if (newDir === 'rtl') {
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

          // Update numbering position for ordered lists
          const numberSpan = li.querySelector('.list-number');
          if (numberSpan && list.tagName.toLowerCase() === 'ol') {
            const span = numberSpan as HTMLElement;
            if (newDir === 'rtl') {
              span.style.right = '0';
              span.style.left = 'auto';
              span.style.marginRight = '0.25em';
              span.style.marginLeft = '0';
            } else {
              span.style.left = '0';
              span.style.right = 'auto';
              span.style.marginLeft = '0.25em';
              span.style.marginRight = '0';
            }
          }
        });
      });
      
      editorRef.current.focus();
    }
  };

  return (
    <div className="border-b p-3 bg-gray-50 flex flex-wrap gap-2" dir="rtl">
      {/* Text Formatting */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('bold')}
          title="מודגש (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('italic')}
          title="נטוי (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('underline')}
          title="קו תחתון (Ctrl+U)"
        >
          <span className="text-sm font-bold">U</span>
        </Button>
      </div>

      {/* Font Family */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <select 
          onChange={(e) => onExecuteCommand('fontName', e.target.value)}
          className="text-sm border rounded px-2 py-1 bg-white"
          defaultValue=""
          dir="rtl"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Headings */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <select 
          onChange={(e) => onSetHeading(parseInt(e.target.value) || 0)}
          className="text-sm border rounded px-2 py-1 bg-white"
          defaultValue=""
          dir="rtl"
        >
          <option value="">פסקה רגילה</option>
          {HEADING_OPTIONS.slice(1).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <select 
          onChange={(e) => onExecuteCommand('fontSize', e.target.value)}
          className="text-sm border rounded px-2 py-1 bg-white"
          defaultValue=""
          dir="rtl"
        >
          {FONT_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text Color */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <input
          type="color"
          onChange={(e) => onExecuteCommand('foreColor', e.target.value)}
          className="w-8 h-8 rounded border cursor-pointer"
          title="צבע טקסט"
        />
      </div>

      {/* Alignment */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('justifyRight')}
          title="יישור לימין"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('justifyCenter')}
          title="יישור למרכז"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('justifyLeft')}
          title="יישור לשמאל"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Lists */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => toggleList(false)}
          title="רשימת תבליטים (הוסף/הסר)"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => toggleList(true)}
          title="רשימה ממוספרת (הוסף/הסר)"
        >
          <span className="text-sm font-bold">.1</span>
        </Button>
      </div>

      {/* Link */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onInsertLink}
          title="הוסף קישור"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Upload */}
      <div className="flex items-center space-x-reverse space-x-1">
        <input
          type="file"
          id="rich-editor-image"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('rich-editor-image')?.click()}
          disabled={isUploading}
          title="הוסף תמונה"
        >
          <Image className="h-4 w-4" />
          {isUploading && <span className="mr-1">...</span>}
        </Button>
      </div>

      {/* Direction Toggle */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleDirection}
          title="החלף כיוון כתיבה (עברית/אנגלית)"
        >
          <Languages className="h-4 w-4" />
        </Button>
      </div>

      {/* Undo/Redo */}
      <div className="flex items-center border-l border-gray-300 pl-2 ml-2 space-x-reverse space-x-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('undo')}
          title="בטל (Ctrl+Z)"
        >
          <span className="text-sm">↶</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onExecuteCommand('redo')}
          title="חזור (Ctrl+Y)"
        >
          <span className="text-sm">↷</span>
        </Button>
      </div>
    </div>
  );
}