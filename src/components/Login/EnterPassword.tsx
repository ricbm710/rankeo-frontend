type Props = {
  email: string;
  onBack: () => void;
};

const EnterPassword = ({ email, onBack }: Props) => {
  return (
    <form className="p-4">
      <div className="input-like">
        <div>{email}</div>
      </div>
      <button className="link-button" onClick={onBack}>
        Cambiar correo
      </button>
      <input
        type="password"
        name="password"
        id="password"
        className="mt-2"
        placeholder="Ingresa tu contraseña"
      />

      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default EnterPassword;
