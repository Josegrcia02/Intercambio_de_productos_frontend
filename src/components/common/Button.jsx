// Componente reutilizable de Botón
export default function Button({ text, onClick, type = 'button' }) {
  return (
    <button 
      type={type} 
      onClick={onClick}
      className="btn-primary" // Aquí tu compañero pondrá las clases CSS
    >
      {text}
    </button>
  );
}