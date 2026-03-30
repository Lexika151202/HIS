import React, { useState } from 'react';
import {
  Shield, ArrowLeft, Save, ChevronRight, Trash2, ChevronDown, Pencil
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal';

const PermissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const [isEdit, setIsEdit] = useState(isNew);
  
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Hierarchical data structure for permissions
  const modulePermissions = [
    {
      id: '1',
      name: 'Tiếp đón',
      features: [
        { id: '1.1', name: 'Tiếp đón', functions: [] }
      ]
    },
    {
      id: '2',
      name: 'Danh sách đăng ký',
      features: [
        { 
          id: '2.1', 
          name: 'Danh sách đăng ký', 
          functions: ['Xem danh sách đăng ký', 'Khám bệnh', 'Thanh toán', 'Chỉnh sửa', 'In phiếu', 'Xóa'] 
        },
        { 
          id: '2.2', 
          name: 'Chi tiết đăng ký', 
          functions: ['Xem chi tiết đăng ký', 'Khám bệnh', 'Thanh toán', 'Chỉnh sửa', 'In phiếu', 'Xóa', 'Thêm chỉ định', 'Thêm thuốc'] 
        },
        { id: '2.3', name: 'Tạo chỉ định', functions: [] },
        { id: '2.4', name: 'Tạo đơn kê thuốc', functions: [] }
      ]
    },
    {
      id: '3',
      name: 'Khám bệnh ngoại trú',
      features: [
        { 
          id: '3.1', 
          name: 'Danh sách khám bệnh ngoại trú', 
          functions: ['Xem danh sách khám bệnh', 'Hủy xác nhận chi phí'] 
        },
        { 
          id: '3.2', 
          name: 'Chi tiết khám bệnh', 
          functions: ['Xem chi tiết khám bệnh', 'Hủy xác nhận chi phí', 'In phiếu', 'Chỉnh sửa', 'Xóa', 'Thêm chỉ định', 'Thêm thuốc'] 
        }
      ]
    }
  ];

  const [permission, setPermission] = useState({
    code: isNew ? '' : (id || 'ADM001'),
    name: isNew ? '' : 'Quản trị hệ thống',
    description: isNew ? '' : 'Toàn quyền thao tác trên các phân hệ lâm sàng và quản trị hệ thống.'
  });

  const [selectedFunctions, setSelectedFunctions] = useState(isNew ? [] : ['2.1.1', '2.2.1', '3.1.1', '3.2.1']);
  const [expandedModules, setExpandedModules] = useState(isNew ? modulePermissions.map(m => m.id) : ['2', '3']); 

  const toggleFunction = (fid) => {
    if (!isEdit) return;
    if (selectedFunctions.includes(fid)) {
      setSelectedFunctions(selectedFunctions.filter(f => f !== fid));
    } else {
      setSelectedFunctions([...selectedFunctions, fid]);
    }
  };

  const toggleModuleCollapse = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(mid => mid !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const getModuleFunctionIds = (module) => {
    let ids = [];
    module.features.forEach(feature => {
      ids.push(feature.id);
      feature.functions.forEach((_, idx) => {
        ids.push(`${feature.id}.${idx + 1}`);
      });
    });
    return ids;
  };

  const isModuleFullySelected = (module) => {
    const allIds = getModuleFunctionIds(module);
    if (allIds.length === 0) return false;
    return allIds.every(fid => selectedFunctions.includes(fid));
  };

  const toggleAllModuleFunctions = (module) => {
    if (!isEdit) return;
    const allIds = getModuleFunctionIds(module);
    const isFullySelected = isModuleFullySelected(module);
    
    if (isFullySelected) {
      setSelectedFunctions(selectedFunctions.filter(fid => !allIds.includes(fid)));
    } else {
      const newSelections = new Set([...selectedFunctions, ...allIds]);
      setSelectedFunctions(Array.from(newSelections));
    }
  };

  const handleSave = () => {
    setIsEdit(false);
    if (isNew) navigate('/admin/permissions');
  };

  const handleDelete = () => {
    navigate('/admin/permissions');
  };

  return (
    <div className="animate-fade">
      <ConfirmationModal 
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={handleSave}
        title={isNew ? "Tạo nhóm quyền" : "Lưu thay đổi"}
        message={isNew ? "Bạn có chắc chắn muốn tạo nhóm quyền mới này không?" : "Bạn có chắc chắn muốn lưu các thay đổi này không?"}
        type="success"
        confirmText={isNew ? "Tạo ngay" : "Lưu ngay"}
      />

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Xóa nhóm quyền"
        message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa nhóm quyền này khỏi hệ thống?"
        type="danger"
        confirmText="Xác nhận xóa"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/admin/permissions')} className="btn" style={{ padding: '8px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex' }}>
            <ArrowLeft size={20} color="#64748b" />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span>Quản lý Phân quyền</span>
              <ChevronRight size={14} />
              <span>{isNew ? 'Thêm nhóm quyền mới' : 'Chi tiết quyền'}</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
              {isNew ? 'Thêm nhóm quyền hệ thống' : `Quyền: ${permission.code}`}
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isNew && (
            <button className="btn" onClick={() => setShowDeleteConfirm(true)} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trash2 size={18} /> Xóa
            </button>
          )}
          {!isEdit ? (
            <button className="btn" onClick={() => setIsEdit(true)} style={{ background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pencil size={18} /> Chỉnh sửa
            </button>
          ) : (
             <button className="btn btn-primary" onClick={() => setShowSaveConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> {isNew ? 'Tạo nhóm quyền' : 'Lưu thay đổi'}
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} color="#2563eb" /> Thông tin nhóm quyền
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mã quyền hệ thống</label>
                <input type="text" className="modern-input" value={permission.code} onChange={(e) => setPermission({...permission, code: e.target.value.toUpperCase()})} placeholder="VD: ADM001" disabled={!isEdit || !isNew} />
              </div>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Tên nhóm quyền</label>
                <input type="text" className="modern-input" value={permission.name} onChange={(e) => setPermission({...permission, name: e.target.value})} placeholder="VD: Quản trị hệ thống" disabled={!isEdit} />
              </div>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mô tả chi tiết</label>
                <textarea className="modern-input" style={{ minHeight: '120px', resize: 'none' }} value={permission.description} onChange={(e) => setPermission({...permission, description: e.target.value})} placeholder="Nhập mô tả cho nhóm quyền này..." disabled={!isEdit} />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ paddingBottom: '1rem', borderBottom: '2px solid #2563eb', fontWeight: 800, fontSize: '1rem', color: '#2563eb' }}>Chức năng thuộc quyền</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {modulePermissions.map(module => (
              <div key={module.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #e2e8f0', marginBottom: expandedModules.includes(module.id) ? '1.25rem' : '0' }}>
                  <div onClick={() => toggleModuleCollapse(module.id)} style={{ background: '#f8fafc', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #e2e8f0' }}>
                    {expandedModules.includes(module.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <input type="checkbox" checked={isModuleFullySelected(module)} onChange={() => toggleAllModuleFunctions(module)} style={{ width: '18px', height: '18px' }} disabled={!isEdit} />
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b', textTransform: 'uppercase' }}>Module: {module.name}</span>
                </div>
                {expandedModules.includes(module.id) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingLeft: '1rem' }}>
                    {module.features.map(feature => (
                      <div key={feature.id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.25rem', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: feature.functions.length > 0 ? '1rem' : 0 }}>
                          <input type="checkbox" checked={selectedFunctions.includes(feature.id)} onChange={() => toggleFunction(feature.id)} style={{ width: '18px', height: '18px' }} disabled={!isEdit} />
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{feature.id}. {feature.name}</span>
                        </div>
                        {feature.functions.length > 0 && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', paddingLeft: '28px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                            {feature.functions.map((fn, idx) => {
                              const fnId = `${feature.id}.${idx + 1}`;
                              return (
                                <label key={fnId} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem' }}>
                                  <input type="checkbox" checked={selectedFunctions.includes(fnId)} onChange={() => toggleFunction(fnId)} style={{ width: '16px', height: '16px' }} disabled={!isEdit} />
                                  {fnId}. {fn}
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionDetail;
