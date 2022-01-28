import HotActionButton from "../components/HotActionButton";
import HowItWorks from "../components/HowItWorks";

function Index() {
  return (
    <div className='container min-h-screen flex flex-col items-center justify-center md:space-y-14'>
      <HotActionButton />
      <HowItWorks />
    </div>
  );
}

export default Index;
