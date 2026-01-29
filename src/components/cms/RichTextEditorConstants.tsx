export const EDITOR_CONFIG = {
  minHeight: '300px',
  defaultFontSize: '16px',
  lineHeight: '1.6',
  fontFamily: 'Open Sans Condensed, Assistant, sans-serif'
};

export const FONT_FAMILIES = [
  { value: '', label: 'בחר פונט' },
  { value: 'Open Sans Condensed, Assistant, sans-serif', label: 'ברירת המחדל (Open Sans Condensed)' },
  { value: 'David, serif', label: 'דוד' },
  { value: 'Aharoni, sans-serif', label: 'אהרוני' },
  { value: 'Ariel, Arial, sans-serif', label: 'אריאל' },
  { value: 'Miriam, Times, serif', label: 'מרים' },
  { value: 'Narkisim, Times, serif', label: 'נרקיסים' },
  { value: 'Rod, sans-serif', label: 'רוד' },
  { value: 'Tahoma, sans-serif', label: 'Tahoma' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Calibri, sans-serif', label: 'Calibri' }
];

export const FONT_SIZES = [
  { value: '', label: 'גודל פונט' },
  { value: '1', label: 'קטן' },
  { value: '3', label: 'רגיל' },
  { value: '4', label: 'גדול' },
  { value: '5', label: 'גדול מאוד' },
  { value: '7', label: 'ענק' }
];

export const HEADING_OPTIONS = [
  { value: '', label: 'כותרת' },
  { value: '1', label: 'כותרת 1' },
  { value: '2', label: 'כותרת 2' },
  { value: '3', label: 'כותרת 3' },
  { value: '4', label: 'כותרת 4' }
];

export const TOOLBAR_BUTTONS = {
  formatting: [
    { command: 'bold', icon: 'Bold', title: 'מודגש' },
    { command: 'italic', icon: 'Italic', title: 'נטוי' },
    { command: 'underline', icon: 'U', title: 'קו תחתון', isText: true }
  ],
  alignment: [
    { command: 'justifyRight', icon: 'AlignRight', title: 'יישור לימין' },
    { command: 'justifyCenter', icon: 'AlignCenter', title: 'יישור למרכז' },
    { command: 'justifyLeft', icon: 'AlignLeft', title: 'יישור לשמאל' }
  ],
  lists: [
    { command: 'insertUnorderedList', icon: 'List', title: 'רשימת תבליטים', ordered: false },
    { command: 'insertOrderedList', icon: '1.', title: 'רשימה ממוספרת', ordered: true, isText: true }
  ]
};