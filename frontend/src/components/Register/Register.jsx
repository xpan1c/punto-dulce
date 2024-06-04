import React, { useState } from 'react';
import styles from '../../components/LoginInput/LoginInput.module.css';
import Button from "../Button/Button";
import Link from "../../../public/img/link-button.png"
import { validateEmail, validatePassword } from '../Utils/Validation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const RegisterInput = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) {
      validationErrors.email = 'El campo email es requerido';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Email no es válido';
    }

    if (!password) {
      validationErrors.password = 'El campo contraseña es requerido';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'El campo contraseña es requerido';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceder con el registro
      // console.log("Formulario enviado");
    }
  };
  return (
    <section className={styles.container}>
      <img className={styles.logo} src="../../../public/img/logo.png"  alt="logo de la página" />
      <h1 className={styles.title}>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email </label>
          <div className={styles.passwordWrapper}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.errorInput : ''}
          />
           {errors.email && (
              <div className={styles.passwordToggle}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
            )}
          </div>
          {errors.email && <span className={styles.helperMessage}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña </label>
          <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.errorInput : ''}
          />
          <div
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
            </div>
          {errors.password && <span className={styles.helperMessage}>{errors.password}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmar Contraseña </label>
          <div className={styles.passwordWrapper}>
          <input
          type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassworad ? styles.errorInput : ''}
          />
           <div
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </div>
            </div>
          {errors.confirmPassword && <span className={styles.helperMessage}>{errors.confirmPassword}</span>}
        </div>
        <button className={styles.access}>
        <FontAwesomeIcon icon={faTimesCircle} /> Registrar
          </button>
        <span className={styles.returnLink}>Ya tienes una cuenta? Regresar!</span>
      </form>
    </section>
  );
};

export default RegisterInput;