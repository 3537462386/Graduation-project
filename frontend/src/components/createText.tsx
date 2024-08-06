/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-05-18 16:11:13
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-22 15:51:34
 * @Description: Description
 */
import { useState } from 'react';
import { Button, Input, Upload, Image, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateTextVisible } from '@/store/modules/common';
import { PictureOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { createText } from '@/api';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// interface RecordType {
//   key: string;
//   name: string;
//   avatar: string;
// }
export const CreateText = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imgList, setImgList] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const userInfo = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handlePreview = async (file: UploadFile) => {
    getBase64(file.originFileObj as FileType, (url) => {
      // setLoading(false);
      setPreviewImage(url);
      // console.log(url, 'url');
    });
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // eslint-disable-next-line prefer-const
    setFileList(newFileList);
    const res: string[] = [];
    for (let i = 0; i < newFileList.length; i++) {
      getBase64(newFileList[i].originFileObj as FileType, (url) => {
        res.push(url);
      });
    }
    setImgList(res);
    console.log(res);
  };

  const createNewText = async () => {
    if (!content) {
      message.success('请输入内容');
      return;
    }
    const res = await createText({
      userId: userInfo?.userId,
      content: content,
      imgs: imgList
    });
    if (res.code === 1) {
      message.success('发布成功');
      dispatch(setCreateTextVisible());
    } else {
      message.success('图片过大，请选择小点的图片');
    }
  };
  return (
    <div className="w-100vw h-screen backdrop-blur-sm z-2">
      <div className="h-125 w-125 p-5 bg-white border border-solid border-[#e9e9e9] shadow-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center justify-between mb-4">
          <span></span>
          <p>发表朋友圈</p>
          <Button
            icon={<CloseOutlined />}
            onClick={() => dispatch(setCreateTextVisible())}
          ></Button>
        </div>
        <div>
          <TextArea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            autoSize={{ minRows: 10, maxRows: 10 }}
            variant="borderless"
            value={content}
            placeholder="分享新鲜事..."
            className="w-full h-50 mb-4"
          />
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <div>
                  <PictureOutlined className="text-2xl" />
                  <div>照片</div>
                </div>
              </div>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage('')
              }}
              src={previewImage}
            />
          )}
        </div>
        <div className="w-full flex justify-end mt-5">
          <Button onClick={createNewText}>发布</Button>
          <Button
            className="ml-4"
            onClick={() => dispatch(setCreateTextVisible())}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};
