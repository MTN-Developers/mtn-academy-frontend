import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface IProps {
  semesterId: string;
  semesterName: string;
  courseName?: string;
}

export const BreadcrumbFragment = ({ semesterId, semesterName, courseName }: IProps) => {
  return (
    <div className="text-blue-600 p-4 lg:px-[130px] bg-[#f2f2f2] w-full shadow-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink href={`/academic-paths/${diploma.id}`}>Components</BreadcrumbLink> */}
            <BreadcrumbLink href={`/dashboard/semester/${semesterId}`}>{semesterName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {courseName && (
            <BreadcrumbItem>
              <BreadcrumbPage>{semesterName}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
