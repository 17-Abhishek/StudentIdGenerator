import { useState } from 'react';
import { StudentFormData, CardTemplateType } from '../types/student';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

const allergiesList = [
  { id: 'nuts', label: 'Nuts' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'pollen', label: 'Pollen' },
];

const busRoutes = [
  'Route 1 - North Campus',
  'Route 2 - South Campus',
  'Route 3 - East Campus',
  'Route 4 - West Campus',
  'Route 5 - Downtown',
  'Route 6 - Suburbs',
  'N/A - Not Applicable',
];

const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const divisions = ['A', 'B', 'C', 'D'];

const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  class: z.string().min(1, "Class is required"),
  division: z.string().min(1, "Division is required"),
  allergies: z.array(z.string()),
  photo: z.string().nullable(),
  rackNumber: z.string().min(1, "Rack number is required"),
  busRoute: z.string().min(1, "Bus route is required"),
});

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  selectedTemplate: CardTemplateType;
  onTemplateChange: (template: CardTemplateType) => void;
}

export default function StudentForm({ 
  onSubmit, 
  selectedTemplate, 
  onTemplateChange 
}: StudentFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: '',
      rollNumber: '',
      class: '',
      division: '',
      allergies: [],
      photo: null,
      rackNumber: '',
      busRoute: '',
    },
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      form.setError('photo', { 
        type: 'manual', 
        message: 'File size should not exceed 1MB.' 
      });
      event.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPhotoPreview(result);
      form.setValue('photo', result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (data: z.infer<typeof studentFormSchema>) => {
    if (!data.photo) {
      form.setError('photo', { 
        type: 'manual', 
        message: 'Student photo is required.' 
      });
      return;
    }
    
    onSubmit(data as StudentFormData);
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">Student Information</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter student name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Roll Number */}
            <FormField
              control={form.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter roll number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Class & Division */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Class <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border">
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map(classOption => (
                          <SelectItem key={classOption} value={classOption}>
                            {classOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Division <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border">
                          <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisions.map(division => (
                          <SelectItem key={division} value={division}>
                            {division}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Allergies */}
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem className="relative space-y-4">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                  </FormLabel>
                  
                  {/* Common allergies checkboxes */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {allergiesList.map((allergy) => (
                      <FormItem
                        key={allergy.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(allergy.label)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, allergy.label])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== allergy.label
                                    )
                                  )
                            }}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormLabel className="ml-2 text-sm text-gray-700 cursor-pointer">
                          {allergy.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  
                  {/* Custom allergy input */}
                  <div className="mt-3">
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Add Custom Allergy
                    </FormLabel>
                    <div className="flex">
                      <Input
                        id="custom-allergy"
                        placeholder="Type a custom allergy"
                        className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                      />
                      <Button
                        type="button"
                        className="rounded-l-none bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          const customAllergyInput = document.getElementById('custom-allergy') as HTMLInputElement;
                          const customAllergy = customAllergyInput.value.trim();
                          
                          if (customAllergy && !field.value.includes(customAllergy)) {
                            field.onChange([...field.value, customAllergy]);
                            customAllergyInput.value = '';
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  {/* Selected allergies display */}
                  {field.value.length > 0 && (
                    <div className="mt-3">
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                        Selected Allergies:
                      </FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((allergy, index) => (
                          <div 
                            key={`${allergy}-${index}`}
                            className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1 flex items-center"
                          >
                            {allergy}
                            <button
                              type="button"
                              className="ml-1 text-gray-500 hover:text-red-500"
                              onClick={() => {
                                field.onChange(field.value.filter((_, i) => i !== index));
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Student Photo <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`w-32 h-40 bg-gray-100 rounded-lg border overflow-hidden flex items-center justify-center ${
                        photoPreview ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      {!photoPreview && (
                        <div className="text-center p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-500 mt-1 block">No photo</span>
                        </div>
                      )}
                      {photoPreview && (
                        <img src={photoPreview} alt="Student photo" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        {...field}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded file:border-0
                          file:text-sm file:font-medium
                          file:bg-primary file:text-white
                          hover:file:bg-indigo-700"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG, or GIF. Max 1MB. Passport size photo recommended.
                      </p>
                    </div>
                  </div>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Rack Number */}
            <FormField
              control={form.control}
              name="rackNumber"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Rack Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter rack number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Bus Route Number */}
            <FormField
              control={form.control}
              name="busRoute"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Route Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2.5 border">
                        <SelectValue placeholder="Select Bus Route" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {busRoutes.map(route => (
                        <SelectItem key={route} value={route}>
                          {route}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            
            {/* Template Selection */}
            <div className="relative">
              <h3 className="block text-sm font-medium text-gray-700 mb-2">Card Template</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="radio" 
                    id="template1" 
                    name="template" 
                    value="1" 
                    checked={selectedTemplate === '1'}
                    onChange={() => onTemplateChange('1')}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="template1" 
                    className={`cursor-pointer block rounded-lg border-2 overflow-hidden transition-all ${
                      selectedTemplate === '1' ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    {/* Template preview */}
                    <div className="bg-white p-2">
                      <div className="bg-gradient-to-b from-white to-[#f3f4f6] rounded-lg h-36 p-2 flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div className="bg-primary h-4 w-16 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="bg-gray-200 h-3 w-full rounded"></div>
                          <div className="bg-gray-200 h-3 w-3/4 rounded"></div>
                          <div className="bg-gray-200 h-3 w-2/4 rounded"></div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-sm">Classic Template</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="template2" 
                    name="template" 
                    value="2" 
                    checked={selectedTemplate === '2'}
                    onChange={() => onTemplateChange('2')}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="template2" 
                    className={`cursor-pointer block rounded-lg border-2 overflow-hidden transition-all ${
                      selectedTemplate === '2' ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    {/* Template preview */}
                    <div className="bg-white p-2">
                      <div className="bg-gradient-to-tr from-[#4F46E5] to-[#1D4ED8] rounded-lg h-36 p-2 flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-white/30 rounded"></div>
                          <div className="bg-white/30 h-4 w-16 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="bg-white/30 h-3 w-full rounded"></div>
                          <div className="bg-white/30 h-3 w-3/4 rounded"></div>
                          <div className="bg-white/30 h-3 w-2/4 rounded"></div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-sm">Modern Template</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-primary text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-medium transition-colors"
              >
                Generate ID Card
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
