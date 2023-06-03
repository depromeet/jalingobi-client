import { TextFields } from '@/shared/components/TextField';

export default function Home() {
  return (
    <main>
      default
      <TextFields value="" onChange={() => {}} />
      price
      <TextFields value="" type="price" onChange={() => {}} />
    </main>
  );
}
