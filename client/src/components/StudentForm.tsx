import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "../types";
import { formOptions } from "../data/formOptions";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface StudentFormProps {
  onSubmit: (data: Student) => void;
}

const studentFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  rollNumber: z.string().min(1, { message: "Roll Number is required" }),
  class: z.string().min(1, { message: "Class is required" }),
  division: z.string().min(1, { message: "Division is required" }),
  allergies: z.array(z.string()).optional().default([]),
  photo: z.string().nullable().default(null),
  rackNumber: z.string().min(1, { message: "Rack Number is required" }),
  busRoute: z.string().min(1, { message: "Bus Route is required" })
});

type StudentFormData = z.infer<typeof studentFormSchema>;

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      class: "",
      division: "",
      allergies: [],
      photo: null,
      rackNumber: "",
      busRoute: ""
    }
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should not exceed 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoPreview(result);
      form.setValue("photo", result);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (data: StudentFormData) => {
    onSubmit(data as Student);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter student's full name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Roll Number */}
          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Roll Number</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter roll number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Class & Division */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Class</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formOptions.classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Division</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formOptions.divisions.map((div) => (
                        <SelectItem key={div} value={div}>{div}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Allergies */}
          <FormField
            control={form.control}
            name="allergies"
            render={() => (
              <FormItem>
                <div className="mb-1">
                  <FormLabel className="text-sm font-medium text-gray-700">Allergies</FormLabel>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {formOptions.allergies.map((allergy) => (
                    <FormField
                      key={allergy}
                      control={form.control}
                      name="allergies"
                      render={({ field }) => {
                        return (
                          <FormItem key={allergy} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(allergy)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, allergy])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== allergy
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="ml-2 text-sm text-gray-700">{allergy}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Photo Upload */}
          <div>
            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Photo Upload</FormLabel>
            <div className="mt-1 flex items-center space-x-4">
              <div className="w-24 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Student Preview" className="w-full h-full object-cover" />
                ) : (
                  <i className="fas fa-user text-gray-400 text-3xl"></i>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                  <span>Upload Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="sr-only"
                    onChange={handlePhotoUpload}
                  />
                </label>
                <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
              </div>
            </div>
          </div>
          
          {/* Rack & Bus Route */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rackNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Rack Number</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter rack number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="busRoute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Bus Route</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select Bus Route" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formOptions.busRoutes.map((route) => (
                        <SelectItem key={route} value={route}>{route}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Generate ID Card
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
