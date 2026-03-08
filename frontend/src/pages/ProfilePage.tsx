import { use, useEffect } from "react";

export const ProfilePage = () => {
  useEffect(() => {
    // Cuando este el backend activo se cargaran los datos al ingresar
  }, []);
  
  const handleUpdateProfile = () => {
    // Lógica para actualizar el perfil
  }

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta
  }

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Profile Page</h1>
      <section>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Nombre <input autoFocus name="nombre" disabled></input>
          </label>
          <label>
            Correo <input name="correo" disabled></input>
          </label>
          <label>
            Contraseña <input name="contrasenia" disabled></input>
          </label>
        </form>
        <button></button>
      </section>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "20px",
        }}
      >
        <button>Actualizar perfil</button>
        <button>Eliminar cuenta</button>
      </div>
    </>
  );
};
