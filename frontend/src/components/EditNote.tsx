import { useNavigate, useParams } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import Form from './Form';
import Loading from './Loading';
import { toast } from 'sonner';
import { type SubmitHandler } from 'react-hook-form';
import { API_URL, EDIT_INPUTS } from '../constants';
import { FormType, RepairNoteType } from '../types';
import {
  createFormDataFromNote,
  createNoteFromForm,
  filterNote,
  formatDateToInput
} from '../utils';
import useToken from '../hooks/useToken';

function EditNote() {
  const { id } = useParams();
  const { token, logout } = useToken();
  const navigate = useNavigate();

  const { data: note, error, isLoading } = useNotes<RepairNoteType>(`/${id}`);

  if (null == token) {
    logout();

    return navigate('login');
  }

  const URL = `${API_URL}/${id}`;

  if (isLoading) return <Loading />;

  if (
    error &&
    (error.status === 401 || error.status === 403 || error.status === 500)
  ) {
    toast.error(error.message);

    logout();

    navigate('/login');
  }

  if (error || null == note) {
    const message = error?.info.error;

    toast.error(message);

    return setTimeout(navigate, 100, '/');
  }

  const formDataFromNote = createFormDataFromNote(note);

  const defaultValues = {
    ...formDataFromNote,
    entryDate: formatDateToInput(new Date(formDataFromNote.entryDate)),
    departureDate:
      null != note.departureDate
        ? formatDateToInput(new Date(formDataFromNote.departureDate as Date))
        : null
  };

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    try {
      const noteFromForm = createNoteFromForm(formData);
      const editedNote = filterNote(noteFromForm);

      const response = await fetch(URL, {
        method: 'PATCH',
        body: JSON.stringify(editedNote),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.status == 422) {
        const { errors } = data;

        errors.forEach((error: string) => toast.error(error));

        return;
      }

      const isEdited = (data as number) > 0;

      if (!isEdited)
        return toast.error('Ocurrió un error al intentar editar la nota');

      toast.info(`Nota ${id} editada correctamente`);

      return setTimeout(navigate, 100, '/');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async () => {
    if (!confirm('¿Seguro que quieres borrar la nota?')) return;

    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200)
      return toast.error(`No se pudo borrar la nota ${id}`);

    toast.success(`Nota ${id} borrada`);

    return setTimeout(navigate, 100, '/');
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      inputs={EDIT_INPUTS}
      isEdit={true}
      deleteNote={deleteNote}
    />
  );
}

export default EditNote;
