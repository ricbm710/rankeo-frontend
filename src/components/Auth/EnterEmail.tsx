const EnterEmail = () => {
  return (
    <form className="p-4">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Ingresa tu correo"
        required
      />
      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default EnterEmail;
