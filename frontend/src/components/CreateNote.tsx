import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePDF } from '@react-pdf/renderer';
import Form from './Form';
import PDFDocument from './PDFDocument';
import { toast } from 'sonner';
import { type SubmitHandler } from 'react-hook-form';
import { API_URL, CREATE_INPUTS, DEFAULT_FORM_VALUES } from '../constants';
import { FormType } from '../types';
import { createNoteFromForm, filterNote } from '../utils';

function CreateNote() {
  const navigate = useNavigate();
  const [document, updateDocument] = usePDF();

  useEffect(() => {
    if (document.url == null) return;

    window.open(document.url, '_blank', 'noopener,noreferrer');

    navigate('/');
  }, [document, navigate]);

  const URL = `${API_URL}/`;
  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    try {
      const noteFromData = createNoteFromForm(formData);
      const newNote = filterNote(noteFromData);
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.status == 422) {
        const { errors } = data;

        errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      toast.success('Nota de reparación creada correctamente');

      updateDocument(<PDFDocument note={data} />);
    } catch (error) {
      toast.error('Ocurrió un error al intentar crear la nota de reparación');
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={DEFAULT_FORM_VALUES}
      inputs={CREATE_INPUTS}
    />
  );
}

export default CreateNote;
