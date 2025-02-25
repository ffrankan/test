import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, PDFDocumentProxy, pdfjs } from 'react-pdf';
import { nanoid } from 'nanoid';
import { 
  FileTextOutlined, 
  AudioOutlined, 
  VideoCameraOutlined, 
  ToolOutlined,
  SaveOutlined,
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import './index.module.less';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjs.pdf;
// 定义可添加的内容类型
type ContentType = 'text' | 'audio' | 'video' | 'tool';

// 内容项接口
interface ContentItem {
  id: string;
  type: ContentType;
  pageNumber: number;
  x: number;
  y: number;
  content: string; // 文本内容或媒体URL
  width?: number;
  height?: number;
  toolType?: string; // 用于工具类型的额外参数
}

interface PDFEditorProps {
  onSave: (items: ContentItem[]) => void;
  initialItems?: ContentItem[];
}

const PDFEditor: React.FC<PDFEditorProps> = ({ onSave, initialItems = [] }) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageScale, setPageScale] = useState<number>(1);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialItems);
  const [activeType, setActiveType] = useState<ContentType | null>(null);
  const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number }[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // 文件上传处理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setContentItems(initialItems); // 重置或保留已有标注
      setCurrentPage(1);
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
    onSave(contentItems);
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
          content = <div className="content-text">{item.content}</div>;
          break;
        case 'audio':
          content = (
            <div className="content-audio">
              <div className="media-label">音频</div>
              <audio controls src={item.content}>
                您的浏览器不支持音频元素
              </audio>
            </div>
          );
          break;
        case 'video':
          content = (
            <div className="content-video">
              <div className="media-label">视频</div>
              <video controls width={item.width} height={item.height}>
                <source src={item.content} />
                您的浏览器不支持视频元素
              </video>
            </div>
          );
          break;
        case 'tool':
          content = (
            <div className="content-tool">
              <ToolOutlined className="tool-icon" />
              <span>{item.content}</span>
            </div>
          );
          break;
      }
      
      return (
        <div
          key={item.id}
          className={`content-item content-${item.type}`}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: item.width ? `${item.width}px` : 'auto',
            height: item.height ? `${item.height}px` : 'auto',
          }}
          onDoubleClick={() => handleItemDoubleClick(item)}
        >
          {content}
          <button className="remove-btn" onClick={(e) => removeItem(item.id, e)}>
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
      <div className="modal-overlay">
        <div className="modal-content">
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
              <div className="form-group">
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
              <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
            
            <div className="form-actions">
              <button type="button" onClick={cancelEditing}>取消</button>
              <button type="submit">保存</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 渲染空状态
  const renderEmptyState = () => {
    if (file) return null;
    
    return (
      <div className="empty-state">
        <h3>开始课程编辑</h3>
        <p>上传PDF文件，开始为课程添加互动内容</p>
        <button className="upload-btn" onClick={triggerFileUpload}>
          <UploadOutlined /> 上传PDF
        </button>
      </div>
    );
  };

  return (
    <div className="pdf-editor">
      <div className="editor-toolbar">
        <div className="left-section">
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button 
            className={classNames('upload-btn', { 'has-file': !!file })}
            onClick={triggerFileUpload}
          >
            <UploadOutlined /> {file ? file.name : '上传PDF'}
          </button>
        </div>
        
        <div className="content-tools">
          <button 
            className={classNames('tool-btn', 'text-tool', { active: activeType === 'text' })}
            onClick={() => setActiveType('text')}
          >
            <FileTextOutlined /> 添加文字
          </button>
          <button 
            className={classNames('tool-btn', 'audio-tool', { active: activeType === 'audio' })}
            onClick={() => setActiveType('audio')}
          >
            <AudioOutlined /> 添加音频
          </button>
          <button 
            className={classNames('tool-btn', 'video-tool', { active: activeType === 'video' })}
            onClick={() => setActiveType('video')}
          >
            <VideoCameraOutlined /> 添加视频
          </button>
          <button 
            className={classNames('tool-btn', 'tool-tool', { active: activeType === 'tool' })}
            onClick={() => setActiveType('tool')}
          >
            <ToolOutlined /> 添加工具
          </button>
          
          <button className="save-btn" onClick={handleSave} disabled={!file}>
            <SaveOutlined /> 保存课程
          </button>
        </div>
      </div>

      {renderEmptyState()}

      {file && (
        <>
          {numPages > 1 && (
            <div className="page-navigation">
              <button 
                className="nav-btn" 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <LeftOutlined />
              </button>
              <div className="page-info">
                {currentPage} / {numPages}
              </div>
              <button 
                className="nav-btn" 
                onClick={goToNextPage}
                disabled={currentPage === numPages}
              >
                <RightOutlined />
              </button>
            </div>
          )}

          <div className="pdf-container" ref={documentRef}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdf-document"
            >
              <div 
                key={`page-container-${currentPage}`} 
                className="page-container"
                ref={el => pagesRef.current[currentPage - 1] = el}
              >
                <Page
                  key={`page-${currentPage}`}
                  pageNumber={currentPage}
                  scale={pageScale}
                  onLoadSuccess={(page) => onPageLoadSuccess(page, currentPage - 1)}
                  onClick={(e) => handlePageClick(e, currentPage)}
                  className="pdf-page"
                />
                <div className="content-overlay">
                  {renderContentItems(currentPage)}
                </div>
              </div>
            </Document>
          </div>
        </>
      )}

      {renderEditModal()}
    </div>
  );
};

export default PDFEditor;