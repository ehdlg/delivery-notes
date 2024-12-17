import useToken from '../hooks/useToken';
import { toast } from 'sonner';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { LoginKeys, UserInput } from '../types';
import { API_URL, LOGIN_INPUTS } from '../constants';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const { isLoggedIn, login } = useToken();
  const navigate = useNavigate();

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInput>();

  if (isLoggedIn) return <Navigate to='/' replace={true} />;

  const onSubmit: SubmitHandler<UserInput> = async (credentials) => {
    const URL = `${API_URL}/login`;
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();

    if (response.status === 401) {
      resetField('password');
      return toast.error(data.error);
    }

    if (response.status === 422) {
      const { errors }: { errors: string[] } = data;

      errors.forEach((error: string) => {
        toast.error(error);
      });

      return;
    }

    login(data.token);

    toast.success('Inicio de sesión correcto');

    setTimeout(navigate, 100, '/');
  };

  return (
    <div className='mx-auto mt-10 max-w-lg'>
      <h2 className='mb-4 text-center text-2xl font-semibold text-slate-700'>
        Iniciar sesión
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=''
        className='mx-auto flex min-h-[400px] w-11/12 flex-col justify-around rounded-md bg-white p-8 shadow-lg'
      >
        {LOGIN_INPUTS.map((input) => {
          const inputName = input.name as LoginKeys;
          const inputOptions = input.options as RegisterOptions<
            UserInput,
            LoginKeys
          >;
          return (
            <label
              className='text-md mx-auto mb-2 flex w-11/12 flex-col gap-2 text-slate-800'
              key={input.name}
            >
              <span className='text-sm font-medium text-slate-700'>
                {input.label}
              </span>
              <input
                type={input.type}
                className='block w-full rounded-md border border-slate-200 px-4 py-2 outline-none transition duration-200 ease-in focus:border-slate-300 focus:drop-shadow-md'
                {...register(inputName, inputOptions)}
              />
              {errors[inputName] && (
                <span className='text-sm text-red-400'>
                  {errors[inputName].message}
                </span>
              )}
            </label>
          );
        })}

        <button
          type='submit'
          className='text-md mx-auto mt-10 w-10/12 justify-self-end rounded-lg bg-emerald-600 px-4 py-2 text-slate-200 drop-shadow-lg transition duration-200 ease-in hover:translate-y-1 hover:bg-emerald-700 hover:drop-shadow-none'
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
