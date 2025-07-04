
import { supabase } from '@/integrations/supabase/client';

export const uploadFile = async (
  file: File,
  bucket: string,
  userId: string,
  fileName?: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName || `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${finalFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const deleteFile = async (
  bucket: string,
  userId: string,
  fileName: string
): Promise<boolean> => {
  try {
    const filePath = `${userId}/${fileName}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};
