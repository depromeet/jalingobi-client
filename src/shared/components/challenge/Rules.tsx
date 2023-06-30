import React from 'react';

import { IconX } from '@/public/svgs';

type Props = {
  rules?: string[];
};

export default function Rules({ rules }: Props) {
  return (
    <div className="my-4">
      <article className="my-2.5 grid grid-cols-6 rounded-md bg-gray-10 p-4">
        <h3>규칙</h3>
        <ul className="font-body-regular-sm col-span-5 text-gray-60">
          {rules?.map((rule, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <IconX className="h-3 w-3" strokeWidth={5} />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
