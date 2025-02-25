import React, { useState, useRef } from 'react';
import { Card, Empty, Button, Space, message } from 'antd';
import { 
  FileTextOutlined, 
  AudioOutlined, 
  VideoCameraOutlined, 
  ToolOutlined,
  SaveOutlined,
  UploadOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Document, Page, PDFDocumentProxy, pdfjs } from 'react-pdf';
import { nanoid } from 'nanoid';
import styles from './index.module.less';

// 设置PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// 定义可添加的内容类型
type ContentType = 'text' | 'audio' | 'video' | 'tool';

// 内容项接口
interface ContentItem {
  id: string;
  type: ContentType;
  pageNumber: number;
  x: number;
  y: number;
  content: string;
  width?: number;
  height?: number;
  toolType?: string;
}

interface CourseEditorProps {
  onSave?: (items: ContentItem[]) => void;
  initialItems?: ContentItem[];
}

const CourseEditor: React.FC<CourseEditorProps> = ({ 
  onSave = () => {}, 
  initialItems = [] 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageScale, setPageScale] = useState<number>(1);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialItems);
  const [activeType, setActiveType] = useState<ContentType | null>(null);
  const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number }[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // 文件上传处理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setContentItems(initialItems);
      setCurrentPage(1);
      // 清除激活的工具类型
      setActiveType(null);
    }
  };

  // 触发文件上传
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // PDF加载成功回调
  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setPdfDimensions(new Array(pdf.numPages).fill({ width: 0, height: 0 }));
    pagesRef.current = new Array(pdf.numPages).fill(null);
  };

  // 页面渲染成功回调
  const onPageLoadSuccess = (page: any, index: number) => {
    const { width, height } = page.getViewport({ scale: 1 });
    const newDimensions = [...pdfDimensions];
    newDimensions[index] = { width, height };
    setPdfDimensions(newDimensions);
  };

  // 处理页面点击，添加内容
  const handlePageClick = (e: React.MouseEvent, pageNumber: number) => {
    if (!activeType) return;
    
    const pageDiv = pagesRef.current[pageNumber - 1];
    if (!pageDiv) return;
    
    const rect = pageDiv.getBoundingClientRect();
    const x = (e.clientX - rect.left) / pageScale;
    const y = (e.clientY - rect.top) / pageScale;
    
    // 创建新的内容项
    const newItem: ContentItem = {
      id: nanoid(),
      type: activeType,
      pageNumber,
      x,
      y,
      content: '',
      width: activeType === 'text' ? 240 : 180,
      height: activeType === 'video' ? 150 : 60,
    };
    
    // 打开编辑模态框
    setEditingItem(newItem);
  };

  // 保存编辑的内容
  const saveEditedItem = (item: ContentItem) => {
    const existingItemIndex = contentItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      // 更新现有项
      const updatedItems = [...contentItems];
      updatedItems[existingItemIndex] = item;
      setContentItems(updatedItems);
    } else {
      // 添加新项
      setContentItems([...contentItems, item]);
    }
    
    setEditingItem(null);
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingItem(null);
  };

  // 编辑现有内容
  const handleItemDoubleClick = (item: ContentItem) => {
    setEditingItem({ ...item });
  };

  // 保存所有内容
  const handleSave = () => {
    setLoading(true);
    // 模拟保存操作
    setTimeout(() => {
      onSave(contentItems);
      message.success('课程内容保存成功');
      setLoading(false);
    }, 800);
  };

  // 删除内容项
  const removeItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  // 翻页控制
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 渲染内容项
  const renderContentItems = (pageNumber: number) => {
    const pageItems = contentItems.filter(item => item.pageNumber === pageNumber);
    
    return pageItems.map(item => {
      let content;
      
      switch (item.type) {
        case 'text':
          content = <div className={styles.contentText}>{item.content}</div>;
          break;
        case 'audio':
          content = (
            <div className={styles.contentAudio}>
              <div className={styles.mediaLabel}>音频</div>
              <audio controls src={item.content}>
                您的浏览器不支持音频元素
              </audio>
            </div>
          );
          break;
        case 'video':
          content = (
            <div className={styles.contentVideo}>
              <div className={styles.mediaLabel}>视频</div>
              <video controls width={item.width} height={item.height}>
                <source src={item.content} />
                您的浏览器不支持视频元素
              </video>
            </div>
          );
          break;
        case 'tool':
          content = (
            <div className={styles.contentTool}>
              <ToolOutlined className={styles.toolIcon} />
              <span>{item.content}</span>
            </div>
          );
          break;
      }
      
      return (
        <div
          key={item.id}
          className={`${styles.contentItem} ${styles[`content${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`]}`}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: item.width ? `${item.width}px` : 'auto',
            height: item.height ? `${item.height}px` : 'auto',
          }}
          onDoubleClick={() => handleItemDoubleClick(item)}
        >
          {content}
          <button className={styles.removeBtn} onClick={(e) => removeItem(item.id, e)}>
            <DeleteOutlined style={{ fontSize: '10px' }} />
          </button>
        </div>
      );
    });
  };

  // 渲染编辑模态框
  const renderEditModal = () => {
    if (!editingItem) return null;
    
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h3>
            {editingItem.type === 'text' ? '编辑文本' :
             editingItem.type === 'audio' ? '编辑音频' :
             editingItem.type === 'video' ? '编辑视频' : '编辑工具'}
          </h3>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            saveEditedItem(editingItem);
          }}>
            {editingItem.type === 'text' && (
              <div className={styles.formGroup}>
                <label>文本内容</label>
                <textarea
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    content: e.target.value
                  })}
                  rows={4}
                />
              </div>
            )}
            
            {(editingItem.type === 'audio' || editingItem.type === 'video') && (
              <div className={styles.formGroup}>
                <label>{editingItem.type === 'audio' ? '音频URL' : '视频URL'}</label>
                <input
                  type="text"
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    content: e.target.value
                  })}
                  placeholder={`请输入${editingItem.type === 'audio' ? '音频' : '视频'}链接`}
                />
              </div>
            )}
            
            {editingItem.type === 'tool' && (
              <>
                <div className={styles.formGroup}>
                  <label>工具名称</label>
                  <input
                    type="text"
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      content: e.target.value
                    })}
                    placeholder="请输入工具名称"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>工具类型</label>
                  <select
                    value={editingItem.toolType || 'calculator'}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      toolType: e.target.value
                    })}
                  >
                    <option value="calculator">计算器</option>
                    <option value="quiz">测验</option>
                    <option value="interactive">互动练习</option>
                  </select>
                </div>
              </>
            )}
            
            <div className={styles.formActions}>
              <button type="button" onClick={cancelEditing}>取消</button>
              <button type="submit">保存</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Card
      title="课程内容编辑"
      extra={
        <Button 
          type="primary" 
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={loading}
          disabled={!file}
        >
          完成后保存
        </Button>
      }
      className={styles.courseEditorCard}
    >
      <div className={styles.editorContainer}>
        {!file ? (
          <div className={styles.uploadArea}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="上传PDF文件，开始为课程添加互动内容"
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button 
                type="primary" 
                icon={<UploadOutlined />} 
                onClick={triggerFileUpload}
              >
                上传PDF
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            <div className={styles.editorToolbar}>
              <Space>
                <Button 
                  type={activeType === 'text' ? 'primary' : 'default'}
                  icon={<FileTextOutlined />}
                  onClick={() => setActiveType(activeType === 'text' ? null : 'text')}
                >
                  添加文字
                </Button>
                <Button 
                  type={activeType === 'audio' ? 'primary' : 'default'}
                  icon={<AudioOutlined />}
                  onClick={() => setActiveType(activeType === 'audio' ? null : 'audio')}
                >
                  添加音频
                </Button>
                <Button 
                  type={activeType === 'video' ? 'primary' : 'default'}
                  icon={<VideoCameraOutlined />}
                  onClick={() => setActiveType(activeType === 'video' ? null : 'video')}
                >
                  添加视频
                </Button>
                <Button 
                  type={activeType === 'tool' ? 'primary' : 'default'}
                  icon={<ToolOutlined />}
                  onClick={() => setActiveType(activeType === 'tool' ? null : 'tool')}
                >
                  添加工具
                </Button>
              </Space>

              <div className={styles.rightSection}>
                <Button 
                  icon={<UploadOutlined />}
                  onClick={triggerFileUpload}
                >
                  重新上传
                </Button>
              </div>
            </div>

            {numPages > 1 && (
              <div className={styles.pageNavigation}>
                <Button
                  icon={<LeftOutlined />}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                />
                <span className={styles.pageInfo}>
                  {currentPage} / {numPages}
                </span>
                <Button 
                  icon={<RightOutlined />}
                  onClick={goToNextPage}
                  disabled={currentPage === numPages}
                />
              </div>
            )}

            <div className={styles.pdfContainer} ref={documentRef}>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                className={styles.pdfDocument}
              >
                <div 
                  key={`page-container-${currentPage}`} 
                  className={styles.pageContainer}
                  ref={el => pagesRef.current[currentPage - 1] = el}
                >
                  <Page
                    key={`page-${currentPage}`}
                    pageNumber={currentPage}
                    scale={pageScale}
                    onLoadSuccess={(page) => onPageLoadSuccess(page, currentPage - 1)}
                    onClick={(e) => handlePageClick(e, currentPage)}
                    className={styles.pdfPage}
                  />
                  <div className={styles.contentOverlay}>
                    {renderContentItems(currentPage)}
                  </div>
                </div>
              </Document>
            </div>
          </>
        )}
      </div>

      {renderEditModal()}
    </Card>
  );
};

export { CourseEditor };
export default CourseEditor;