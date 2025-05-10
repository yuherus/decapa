import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Pencil, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import useProfileStore from '@/store/profileStore';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const EducationForm = () => {
  const { userEducations, addEducation, updateEducation, deleteEducation, isLoading } = useProfileStore();
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      school: '',
      major: '',
      from_date: '',
      to_date: '',
      is_studying: false,
      additional_details: ''
    }
  });

  const resetForm = () => {
    form.reset({
      school: '',
      major: '',
      from_date: '',
      to_date: '',
      is_studying: false,
      additional_details: ''
    });
    setSelectedEducation(null);
  };

  const openEditDialog = (education) => {
    setSelectedEducation(education);
    form.reset({
      school: education.school || '',
      major: education.major || '',
      from_date: education.from_date ? new Date(education.from_date) : '',
      to_date: education.to_date ? new Date(education.to_date) : '',
      is_studying: education.is_studying || false,
      additional_details: education.additional_details || ''
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (selectedEducation) {
        await updateEducation(selectedEducation.id, data);
        toast.success('Cập nhật học vấn thành công');
      } else {
        await addEducation(data);
        toast.success('Thêm học vấn thành công');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      toast.error('Có lỗi xảy ra: ' + (err.message || 'Không thể lưu thông tin'));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id);
      toast.success('Đã xóa học vấn');
    } catch (err) {
      toast.error('Có lỗi xảy ra: ' + (err.message || 'Không thể xóa'));
    }
  };

  const formatDateRange = (fromDate, toDate, isStudying) => {
    const from = fromDate ? format(new Date(fromDate), 'MM/yyyy', { locale: vi }) : '';
    
    if (isStudying) {
      return `${from} - Hiện tại`;
    }
    
    const to = toDate ? format(new Date(toDate), 'MM/yyyy', { locale: vi }) : '';
    return from && to ? `${from} - ${to}` : from || to || 'Chưa cập nhật';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Học vấn</h2>
        <Button onClick={openCreateDialog}>Thêm học vấn</Button>
      </div>

      {userEducations.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Bạn chưa thêm thông tin học vấn nào.
        </div>
      ) : (
        <div className="space-y-4">
          {userEducations.map((education) => (
            <Card key={education.id}>
              <CardHeader>
                <CardTitle className="text-xl">{education.school}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{education.major}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateRange(education.from_date, education.to_date, education.is_studying)}
                  </p>
                  {education.additional_details && (
                    <p className="text-sm mt-2">{education.additional_details}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => openEditDialog(education)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa thông tin học vấn này? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(education.id)}
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEducation ? 'Cập nhật học vấn' : 'Thêm học vấn mới'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Trường học */}
              <FormField
                control={form.control}
                name="school"
                rules={{ required: 'Vui lòng nhập tên trường học' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trường học</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên trường học" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Chuyên ngành */}
              <FormField
                control={form.control}
                name="major"
                rules={{ required: 'Vui lòng nhập chuyên ngành' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chuyên ngành</FormLabel>
                    <FormControl>
                      <Input placeholder="Chuyên ngành học" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thời gian từ */}
              <FormField
                control={form.control}
                name="from_date"
                rules={{ required: 'Vui lòng chọn thời gian bắt đầu' }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Thời gian bắt đầu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/yyyy", { locale: vi })
                            ) : (
                              <span>Chọn thời gian</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Đang học */}
              <FormField
                control={form.control}
                name="is_studying"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Đang học</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Thời gian đến (chỉ hiển thị nếu không đang học) */}
              {!form.watch('is_studying') && (
                <FormField
                  control={form.control}
                  name="to_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Thời gian kết thúc</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MM/yyyy", { locale: vi })
                              ) : (
                                <span>Chọn thời gian</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Thông tin thêm */}
              <FormField
                control={form.control}
                name="additional_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thông tin thêm</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả thêm về quá trình học tập"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationForm; 
