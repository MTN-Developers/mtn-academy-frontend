import useGetMaterials from '@/app/hooks/useGetMaterials';
import { Course } from '@/app/types/video';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import doc from '@/public/icons/Doc.png';
import { FreeStudyCourse } from '@/app/types/freeStudy';

interface IProps {
  courseDetails: Course | FreeStudyCourse;
}

const MaterialsComp = ({ courseDetails }: IProps) => {
  const {
    data: materials,
    isError,
    error,
    isLoading,
  } = useGetMaterials({
    courseId: courseDetails.id,
  });

  const params = useParams();
  const locale = params.locale as string;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log('error', error);
    return <div>Error</div>;
  }

  // const handleDownloadAll = () => {
  //   if (!materials || materials.data.length === 0) return;

  //   materials.data.forEach(material => {
  //     const fileUrl = locale === 'en' ? material.file_en : material.file_ar;
  //     const fileName = locale === 'en' ? material.title_en : material.title_ar;
  //     downloadFile(fileUrl, fileName);
  //   });
  // };

  const handleDownloadSingle = material => {
    const fileUrl = locale === 'en' ? material.file_en : material.file_ar;
    const fileName = locale === 'en' ? material.title_en : material.title_ar;
    downloadFile(fileUrl, fileName);
  };

  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${format(date, 'MMM')} - ${format(date, 'MMM yyyy')}`;
  };

  return (
    <>
      {materials && materials.data.length > 0 ? (
        <Card className="bg-white rounded-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex justify-start gap-4 items-center">
                <Image
                  src={courseDetails.logo_en || '/default-logo.png'}
                  alt="logo"
                  width={24}
                  height={24}
                  className="rounded-md"
                />
                <h2 className="text-sm lg:text-lg font-medium">
                  {locale === 'en' ? courseDetails.name_en : courseDetails.name_ar}
                </h2>
              </div>
            </div>

            <div className="space-y-1">
              {materials.data.map((material, index) => (
                <div key={material.id}>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex  items-center gap-2">
                      {/* <FileIcon className="h-5 w-5 text-gray-500" /> */}
                      <Image src={doc} alt="doc" width={40} height={40} />
                      <span className="text-sm lg:text-lg text-gray-700">
                        {locale === 'en' ? material.title_en : material.title_ar}-{formatDate(material.created_at)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 text-sm lg:text-lg hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleDownloadSingle(material)}
                    >
                      {locale === 'en' ? 'View' : 'عرض'} <Eye className="ml-2 h-8 w-8" />
                    </Button>
                  </div>
                  {index < materials.data.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>No Materials yet...</>
      )}
    </>
  );
};

export default MaterialsComp;
