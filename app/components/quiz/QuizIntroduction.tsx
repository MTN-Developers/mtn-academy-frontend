import { Quiz } from '@/app/types/quiz';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { TbSquareRoundedCheckFilled } from 'react-icons/tb';

type Props = {
  quiz: Quiz;
};

export const QuizIntroduction = ({ quiz }: Props) => {
  const coutions = [
    {
      id: 1,
      title: 'This is a replicable Content ',
      description:
        'In this course, she gives you the tools you need to transform data into captivating illustrations using ',
    },
    {
      id: 2,
      title: 'This is a replicable Content ',
      description:
        'Cautious is a role that requires the participant to be careful and thoughtful in their approach to the task. They are expected to be aware of their surroundings and to take precautions to avoid harm.',
    },
  ];
  return (
    <div className="w-full flex items-center p-4 lg:px-52 lg:py-10 justify-center flex-col gap-4">
      <h1 className="text-neutral-900 text-3xl lg:text-4xl w-full text-start font-normal">{quiz.title}</h1>
      <p className="w-full text-start text-neutral-700 text-xl lg:text-2xl ">Test description</p>
      <p className="text-neutral-700 lg:text-xl ">
        For many people, images are the most effective way to communicate information. Whether it be a social issue, a
        personal story, or something you find joy in, any subject can inspire a visualization. Data illustrator Sonja
        Kuijpers specializes in turning numbers and information into accessible works of art. She has worked with
        clients including Philips, the Dutch government, and Frankfurter Allgemeine Zeitung.
      </p>
      <p className="w-full text-start text-neutral-700 text-xl lg:text-2xl ">Assignment Roles and Cautious </p>
      <ul className="w-full flex flex-col items-start gap-4">
        {coutions.map(coution => (
          <li key={coution.id} className="max-w-[600px] text-sky-800 text-base font-semibold">
            <div className="flex items-center gap-2">
              <span>
                <GoDotFill />
              </span>
              {coution.title}
            </div>
            <p className="text-neutral-700 text-base font-normal ">{coution.description}</p>
          </li>
        ))}
      </ul>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="flex my-4 items-center gap-2">
            <span className="text-gray-400 text-xl">
              <TbSquareRoundedCheckFilled />
            </span>
            Not Submitted yet
          </p>
          <p className="text-slate-500 my-4 text-sm font-normal">Due Mar 14, 11:59 PM EET Attempts 1 every 24 hours</p>
        </div>
        <div>
          <button className="bg-[#07519c] py-2 px-4 text-sm lg:text-xl text-nowrap  lg:py-4 lg:px-8 text-white rounded-lg">
            Join Assignment
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-400 h-[1px]"></div>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="flex my-4 items-center gap-2">Receive grade</p>
          <p className="text-slate-500 my-4 text-sm font-normal">To Pass 80% or higher</p>
        </div>
        <div className="flex items-center gap-4 flex-col">
          <p className="font-bold">Your grade</p>
          <p className="font-bold">-</p>
        </div>
      </div>
    </div>
  );
};
