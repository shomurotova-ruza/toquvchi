import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <AppShell active="register">
      <AuthForm mode="register" />
    </AppShell>
  );
}
