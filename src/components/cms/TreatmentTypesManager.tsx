import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  ArrowUp, 
  ArrowDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface TreatmentType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  duration: string;
  sessions: string;
  results: string;
  color?: string;
  order: number;
  isActive: boolean;
}

interface TreatmentTypesManagerProps {
  sectionId: string;
  sectionTitle: string;
  onUpdate?: () => void;
}

export function TreatmentTypesManager({ 
  sectionId, 
  sectionTitle,
  onUpdate 
}: TreatmentTypesManagerProps) {
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyTreatment: Omit<TreatmentType, 'id'> = {
    title: '',
    subtitle: '',
    description: '',
    features: [''],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    duration: '',
    sessions: '',
    results: '',
    color: 'border-[#101828]-200 bg-[#101828]-50',
    order: 0,
    isActive: true
  };

  const [newTreatment, setNewTreatment] = useState<Omit<TreatmentType, 'id'>>(emptyTreatment);

  // Load treatments
  const loadTreatments = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/cms/treatment-types/${sectionId}`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded treatments for section', sectionId, ':', data);
        
        // Sort by order (show all treatments in CMS, not just active ones)
        const sortedTreatments = data.sort((a: TreatmentType, b: TreatmentType) => (a.order || 0) - (b.order || 0));
        setTreatments(sortedTreatments);
      } else {
        console.error('Failed to load treatments:', response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
        toast.error(`Failed to load treatments: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Error loading treatments:', error);
      toast.error(`Error loading treatments: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Save treatment
  const saveTreatment = async (treatment: TreatmentType | Omit<TreatmentType, 'id'>, isNew = false) => {
    try {
      // Validate required fields
      if (!treatment.title?.trim()) {
        toast.error('נדרש להזין כותרת');
        return;
      }
      if (!treatment.subtitle?.trim()) {
        toast.error('נדרש להזין כתובית');
        return;
      }
      if (!treatment.description?.trim()) {
        toast.error('נדרש להזין תיאור');
        return;
      }
      
      // Filter out empty features
      const cleanedTreatment = {
        ...treatment,
        features: treatment.features.filter(f => f.trim() !== ''),
        order: treatment.order || 0
      };
      
      console.log('Saving treatment:', cleanedTreatment);
      
      const url = isNew 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/cms/treatment-types/${sectionId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/cms/treatment-types/${sectionId}/${(treatment as TreatmentType).id}`;
      
      const method = isNew ? 'POST' : 'PUT';
      
      // Get access token for authentication
      const { data: { session } } = await (await import('../../utils/supabase/client')).supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        toast.error('נדרשת הזדהות למערכת');
        return;
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(cleanedTreatment)
      });

      if (response.ok) {
        const savedTreatment = await response.json();
        console.log('Treatment saved successfully:', savedTreatment);
        toast.success(isNew ? 'הטיפול נוסף בהצלחה' : 'הטיפול עודכן בהצלחה');
        await loadTreatments();
        setEditingId(null);
        setIsAddingNew(false);
        setNewTreatment(emptyTreatment);
        
        // Notify other components
        window.dispatchEvent(new CustomEvent('cmsContentUpdate', {
          detail: { type: 'treatment-types', sectionId }
        }));
        
        if (onUpdate) onUpdate();
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to save treatment');
      }
    } catch (error) {
      console.error('Error saving treatment:', error);
      toast.error(`שגיאה בשמירת הטיפול: ${error instanceof Error ? error.message : 'שגיאה לא ידועה'}`);
    }
  };

  // Delete treatment
  const deleteTreatment = async (id: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הטיפול?')) return;

    try {
      // Get access token for authentication
      const { data: { session } } = await (await import('../../utils/supabase/client')).supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        toast.error('נדרשת הזדהות למערכת');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/cms/treatment-types/${sectionId}/${id}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      if (response.ok) {
        toast.success('הטיפול נמחק בהצלחה');
        await loadTreatments();
        
        // Notify other components
        window.dispatchEvent(new CustomEvent('cmsContentUpdate', {
          detail: { type: 'treatment-types', sectionId }
        }));
        
        if (onUpdate) onUpdate();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete treatment');
      }
    } catch (error) {
      console.error('Error deleting treatment:', error);
      toast.error(`שגיאה במחיקת הטיפול: ${error instanceof Error ? error.message : 'שגיאה לא ידועה'}`);
    }
  };

  // Update order
  const updateOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = treatments.findIndex(t => t.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= treatments.length) return;

    const updatedTreatments = [...treatments];
    [updatedTreatments[currentIndex], updatedTreatments[newIndex]] = 
    [updatedTreatments[newIndex], updatedTreatments[currentIndex]];

    // Update order values
    updatedTreatments.forEach((treatment, index) => {
      treatment.order = index;
    });

    try {
      // Get access token for authentication
      const { data: { session } } = await (await import('../../utils/supabase/client')).supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        toast.error('נדרשת הזדהות למערכת');
        return;
      }

      await Promise.all(
        updatedTreatments.map(treatment =>
          fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/cms/treatment-types/${sectionId}/${treatment.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(treatment)
            }
          )
        )
      );

      setTreatments(updatedTreatments);
      toast.success('סדר הטיפולים עודכן');
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('cmsContentUpdate', {
        detail: { type: 'treatment-types', sectionId }
      }));
      
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('שגיאה בעדכון הסדר');
    }
  };

  useEffect(() => {
    loadTreatments();
  }, [sectionId]);

  const TreatmentForm = ({ 
    treatment, 
    onChange, 
    onSave, 
    onCancel, 
    isNew = false 
  }: {
    treatment: TreatmentType | Omit<TreatmentType, 'id'>;
    onChange: (field: string, value: any) => void;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
  }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{isNew ? 'טיפול חדש' : 'עריכת טיפול'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">כותרת</Label>
            <Input
              id="title"
              value={treatment.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="כותרת הטיפול"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">כתובית</Label>
            <Input
              id="subtitle"
              value={treatment.subtitle}
              onChange={(e) => onChange('subtitle', e.target.value)}
              placeholder="כתובית הטיפול"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">תיאור</Label>
          <Textarea
            id="description"
            value={treatment.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="תיאור מפורט של הטיפול"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="image">תמונה (URL)</Label>
          <Input
            id="image"
            value={treatment.image}
            onChange={(e) => onChange('image', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="duration">משך הטיפול</Label>
            <Input
              id="duration"
              value={treatment.duration}
              onChange={(e) => onChange('duration', e.target.value)}
              placeholder="45 דקות"
            />
          </div>
          <div>
            <Label htmlFor="sessions">מספר טיפולים</Label>
            <Input
              id="sessions"
              value={treatment.sessions}
              onChange={(e) => onChange('sessions', e.target.value)}
              placeholder="3-6 טיפולים"
            />
          </div>
          <div>
            <Label htmlFor="results">תוצאות</Label>
            <Input
              id="results"
              value={treatment.results}
              onChange={(e) => onChange('results', e.target.value)}
              placeholder="3-6 חודשים"
            />
          </div>
        </div>

        <div>
          <Label>יתרונות</Label>
          {treatment.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...treatment.features];
                  newFeatures[index] = e.target.value;
                  onChange('features', newFeatures);
                }}
                placeholder="יתרון של הטיפול"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newFeatures = treatment.features.filter((_, i) => i !== index);
                  onChange('features', newFeatures);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange('features', [...treatment.features, ''])}
          >
            <Plus className="h-4 w-4 mr-2" />
            הוסף יתרון
          </Button>
        </div>

        <div className="flex items-center space-x-reverse space-x-2">
          <Switch
            checked={treatment.isActive}
            onCheckedChange={(checked) => onChange('isActive', checked)}
          />
          <Label>פעיל</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            שמור
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            בטל
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div className="p-4">טוען...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{sectionTitle}</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-[#905e26] hover:bg-[#7a4e20] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          הוסף טיפול
        </Button>
      </div>

      {isAddingNew && (
        <TreatmentForm
          treatment={newTreatment}
          onChange={(field, value) => setNewTreatment(prev => ({ ...prev, [field]: value }))}
          onSave={() => saveTreatment(newTreatment, true)}
          onCancel={() => {
            setIsAddingNew(false);
            setNewTreatment(emptyTreatment);
          }}
          isNew={true}
        />
      )}

      <div className="space-y-4">
        {treatments.map((treatment, index) => (
          <div key={treatment.id}>
            {editingId === treatment.id ? (
              <TreatmentForm
                treatment={treatment}
                onChange={(field, value) => {
                  setTreatments(prev =>
                    prev.map(t => t.id === treatment.id ? { ...t, [field]: value } : t)
                  );
                }}
                onSave={() => saveTreatment(treatment)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{treatment.title}</h4>
                        <Badge variant="secondary">{treatment.subtitle}</Badge>
                        {treatment.isActive ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{treatment.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>משך: {treatment.duration}</span>
                        <span>טיפולים: {treatment.sessions}</span>
                        <span>תוצאות: {treatment.results}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateOrder(treatment.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateOrder(treatment.id, 'down')}
                        disabled={index === treatments.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(treatment.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTreatment(treatment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {treatments.length === 0 && !isAddingNew && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">אין טיפולים בקטגוריה זו</p>
            <Button
              onClick={() => setIsAddingNew(true)}
              className="bg-[#905e26] hover:bg-[#7a4e20] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              הוסף את הטיפול הראשון
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}