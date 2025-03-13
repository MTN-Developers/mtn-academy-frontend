import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useParams } from 'next/navigation';

interface IProps {
  semesterId: string;
  semesterName: string;
  courseName?: string;
}

export const BreadcrumbFragment = ({ semesterId, semesterName, courseName }: IProps) => {
  const params = useParams();
  const locale = params.locale as string;
  return (
    <div className="text-blue-600 p-2 lg:px-[130px] bg-[#f2f2f2] w-full shadow-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${locale}`}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink href={`/academic-paths/${diploma.id}`}>Components</BreadcrumbLink> */}
            <BreadcrumbLink href={`/dashboard/semester/${semesterId}`}>{semesterName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {courseName && (
            <BreadcrumbItem>
              <BreadcrumbPage>{courseName}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
