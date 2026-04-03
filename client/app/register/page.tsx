import AppFrame from "../ui/AppFrame";

export default function RegisterPage() {
  return (
    <AppFrame>
      <div className="form-page">
        <h2 className="section-heading center">Ro‘yxatdan o‘tish</h2>
        <form className="register-form">
          <input className="form-input" placeholder="Ism" />
          <input className="form-input" placeholder="Familiya" />
          <input className="form-input" placeholder="Telefon" />
          <input className="form-input" placeholder="Email" />
          <input className="form-input" placeholder="Manzil" />
          <button type="submit" className="primary-btn">Jo‘natish</button>
        </form>
      </div>
    </AppFrame>
  );
}
