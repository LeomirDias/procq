import { SignUpForm } from "./_components/sign-up-form";


const AuthenticationPage = () => {

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Procon Itumbiara</h1>
          {/* <p className="text-muted-foreground">Gerencie seus atendimentos com facilidade</p> */}
        </div>
        <SignUpForm />
      </div>
      <div className="text-muted-foreground mt-2 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}

export default AuthenticationPage;