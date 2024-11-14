import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex  h-screen m-4">
      {/* Left section - Black background */}

      <div className="relative hidden lg:flex w-1/2 h-full items-center justify-center bg-black px-12  mr-4 rounded-lg">
        <img
          src="/images/rangoli.svg"
          alt="Floral Outline"
          className="absolute inset-0 w-full h-full object-cover filter invert opacity-80 pointer-events-none"
        />

        {/* Top-left floral SVG */}

        <img
          src="/images/floral.svg"
          alt="Floral Outline"
          className="absolute top-0 left-0 w-[8vw] h-[8vw] filter opacity-100 pointer-events-none transform scale-x-[-1]"
        />
        {/* Top-right floral SVG */}
        <img
          src="/images/floral.svg"
          alt="Floral Outline"
          className="absolute top-0 right-0 w-[8vw] h-[8vw] filter opacity-100 pointer-events-none"
        />
        {/* Bottom-left floral SVG */}
        <img
          src="/images/floral.svg"
          alt="Floral Outline"
          className="absolute bottom-0 left-0 w-[8vw] h-[8vw] filter opacity-100 pointer-events-none transform scale-y-[-1] scale-x-[-1]"
        />
        {/* Bottom-right floral SVG */}
        <img
          src="/images/floral.svg"
          alt="Floral Outline"
          className="absolute bottom-0 right-0 w-[8vw] h-[8vw] filter opacity-100 pointer-events-none transform scale-y-[-1]"
        />
        <div className="relative max-w-md space-y-6 text-center text-white z-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome to Avaran
          </h1>
          <p className="text-lg">The best sarees you can find.</p>
        </div>
      </div>

      {/* Right section - White background */}
      <div className="flex flex-1 h-full items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 border-2 border-black rounded-lg">
        <div className="w-full max-w-md space-y-8">
          {/* Outlet to render child components like Login or Signup */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
