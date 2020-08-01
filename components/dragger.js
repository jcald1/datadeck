import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: `${process.env.apiClient.url}/seed-data`,
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default () =>
    (
<Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or Drag LandVision CSV File Here</p>
    <p className="ant-upload-hint">
        Only a single CSV file supported at this time
    </p>
</Dragger>)