import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Save, X } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

interface FAQFormProps {
  faq?: any;
  onSave: (type: string, data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const FAQForm: React.FC<FAQFormProps> = ({
  faq,
  onSave,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'השתלות שיער',
    order: faq?.order || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave('faq', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="השאלה"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        required
      />
      <Input
        placeholder="קטגוריה"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="סדר הצגה"
        value={formData.order}
        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium block">התשובה:</label>
        <RichTextEditor
          value={formData.answer}
          onChange={(answer) => setFormData({ ...formData, answer })}
          placeholder="הזינו את התשובה..."
        />
      </div>
      <div className="flex space-x-reverse space-x-2">
        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 ml-2" />
          שמירה
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
      </div>
    </form>
  );
};