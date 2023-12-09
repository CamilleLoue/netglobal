import Image from "next/image";
import background from "@/app/background.png";
import ButtonCheckout from "./ButtonCheckout";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src={background}
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Visualise, manage, boost your bank accounts
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Grow your global wealth, don&apos;t spend time on international
            banking puzzles.
          </p>
          <ButtonCheckout priceId={config.stripe.plans[0].priceId}>
            <button className="btn btn-primary btn-wide">Get NetGlobal</button>
          </ButtonCheckout>
        </div>
      </div>
    </section>
  );
};

export default CTA;
