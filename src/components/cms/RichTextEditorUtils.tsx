export const executeCommand = (command: string, value?: string, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  document.execCommand(command, false, value);
  if (editorRef?.current) {
    editorRef.current.focus();
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }
};

export const setFontSize = (size: string, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  executeCommand('fontSize', size, editorRef, onChange);
};

export const setTextColor = (color: string, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  executeCommand('foreColor', color, editorRef, onChange);
};

export const insertList = (ordered: boolean = false, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  executeCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList', undefined, editorRef, onChange);
};

export const setHeading = (level: number, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  executeCommand('formatBlock', `h${level}`, editorRef, onChange);
};

export const insertLink = (editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  const url = prompt('הזינו כתובת URL:');
  if (url) {
    executeCommand('createLink', url, editorRef, onChange);
  }
};

export const insertImageAtCursor = (imageUrl: string, editorRef?: React.RefObject<HTMLDivElement>, onChange?: (value: string) => void) => {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  img.style.margin = '10px 0';
  img.style.borderRadius = '8px';
  
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.insertNode(img);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (editorRef?.current) {
    editorRef.current.appendChild(img);
  }
  
  if (onChange && editorRef?.current) {
    onChange(editorRef.current.innerHTML);
  }
};