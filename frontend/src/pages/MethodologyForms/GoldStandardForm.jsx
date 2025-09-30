import React, { useState, useEffect, useRef, useMemo, useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Upload, MapPin, Leaf, Trees, Mountain,
  Droplets, FlaskConical, Wind, Settings, Camera, FileText, 
  Shield, Clock, CheckCircle, Home, Save, Eye, EyeOff
} from 'lucide-react';

const GoldStandardForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const navigate = useNavigate();

  // Cursor effects
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Professional color scheme - matching your dark theme
  const primaryColor = 'from-blue-600 to-cyan-600';
  const accentColor = 'from-emerald-600 to-teal-600';

  const sections = useMemo(() => [
    { id: 'project', title: 'A. Project & Spatial Mapping', icon: <MapPin className="w-5 h-5" />, color: primaryColor },
    { id: 'remote', title: 'B. Remote Sensing Inputs', icon: <Camera className="w-5 h-5" />, color: primaryColor },
    { id: 'elevation', title: 'C. Elevation Mapping', icon: <Mountain className="w-5 h-5" />, color: primaryColor },
    { id: 'vegetation', title: 'D. Vegetation (Mangrove)', icon: <Trees className="w-5 h-5" />, color: primaryColor },
    { id: 'landcover', title: 'E. Land Cover Classification', icon: <Leaf className="w-5 h-5" />, color: primaryColor },
    { id: 'soil', title: 'F. Soil/Peat/Sediment', icon: <Droplets className="w-5 h-5" />, color: primaryColor },
    { id: 'spectral', title: 'G. Spectral Indices', icon: <FlaskConical className="w-5 h-5" />, color: primaryColor },
    { id: 'management', title: 'H. Management Events', icon: <Settings className="w-5 h-5" />, color: primaryColor },
    { id: 'calibration', title: 'I. Calibration / QAQC', icon: <FileText className="w-5 h-5" />, color: primaryColor },
    { id: 'carbonpools', title: 'J. Carbon Pools', icon: <Shield className="w-5 h-5" />, color: primaryColor },
    { id: 'emissions', title: 'K. Emissions Estimates', icon: <Wind className="w-5 h-5" />, color: primaryColor },
    { id: 'historic', title: 'L. Historical Data', icon: <Clock className="w-5 h-5" />, color: primaryColor },
    { id: 'declaration', title: 'M. Declaration & Submission', icon: <CheckCircle className="w-5 h-5" />, color: primaryColor },
  ], []);

  // Professional form components with dark theme styling
  const InputField = ({ label, type = "text", placeholder, unit, required = false, value, onChange, name, step }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-blue-200 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {unit && <span className="ml-1 text-xs text-blue-400">({unit})</span>}
      </label>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        name={name}
        required={required}
        step={step}
        className="w-full px-4 py-3 bg-slate-800/60 border border-blue-800/30 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
      />
    </div>
  );

  const MemoInputField = React.memo(InputField);

  const TextArea = ({ label, placeholder, required = false, value, onChange, name, rows = 4 }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-blue-200 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea 
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        name={name}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-slate-800/60 border border-blue-800/30 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm resize-vertical"
      />
    </div>
  );

  const MemoTextArea = React.memo(TextArea);

  const SelectField = ({ label, options = [], required = false, value, onChange, name }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-blue-200 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select 
        value={value || ''}
        onChange={onChange}
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-slate-800/60 border border-blue-800/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
      >
        <option value="" className="bg-slate-800">Select an option...</option>
        {options.map((option, i) => (
          <option key={i} value={option} className="bg-slate-800">{option}</option>
        ))}
      </select>
    </div>
  );

  const MemoSelectField = React.memo(SelectField);

  const FileUpload = ({ label, required = false, accept, multiple = false, onChange, name, uploadedFiles = [] }) => {
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      onChange(files);
      setUploadedFiles(prev => ({
        ...prev,
        [name]: files
      }));
    };

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files || []);
      if (files.length > 0) {
        onChange(files);
        setUploadedFiles(prev => ({
          ...prev,
          [name]: files
        }));
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <div className="mb-6">
        <label className="block text-sm font-semibold text-blue-200 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <div className="border-2 border-dashed border-blue-800/30 rounded-xl p-8 text-center hover:border-blue-500/50 hover:bg-blue-900/20 transition-all duration-300 cursor-pointer backdrop-blur-sm"
             onClick={handleClick}
             onDrop={handleDrop}
             onDragOver={handleDragOver}>
          <Upload className="mx-auto text-blue-400 mb-3 w-8 h-8" />
          <p className="text-blue-300 font-medium mb-1">Click to upload or drag and drop</p>
          <p className="text-blue-400 text-sm">PDF, DOC, XLS, CSV, ZIP files accepted</p>
          <input 
            type="file" 
            className="hidden" 
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            id={name}
            ref={inputRef}
          />
          <label htmlFor={name} className="cursor-pointer" />
        </div>
        
        {/* Show uploaded files */}
        {uploadedFiles[name] && uploadedFiles[name].length > 0 && (
          <div className="mt-3 space-y-2">
            {uploadedFiles[name].map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-blue-900/20 rounded-lg p-3">
                <span className="text-blue-200 text-sm truncate">{file.name}</span>
                <span className="text-blue-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Form data handling
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleInputChange = (section, field) => (e) => {
    const nextValue = e.target.value;
    // Defer state update to keep typing responsive in large component
    startTransition(() => {
      updateFormData(section, field, nextValue);
    });
  };

  const handleFileUpload = (section, field) => (files) => {
    updateFormData(section, field, files);
  };

  const markSectionComplete = (sectionIndex) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      markSectionComplete(currentSection);
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate required fields
      const requiredFields = [
        'project.projectName', 'project.projectId', 'project.area'
      ];
      
      const missingFields = requiredFields.filter(field => {
        const [section, fieldName] = field.split('.');
        return !formData[section]?.[fieldName];
      });

      if (missingFields.length > 0) {
        throw new Error('Please fill all required fields');
      }

      setFeedbackType('success');
      setFeedbackMessage('Gold Standard form submitted successfully! Your project is now under review.');
      setShowFeedback(true);
      
      // Navigate after success
      setTimeout(() => {
        navigate('/methodologies');
      }, 3000);

    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage(error.message || 'Error submitting form. Please check all required fields.');
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section content renderer
  const renderSectionContent = () => {
    const sectionId = sections[currentSection].id;
    
    switch(sectionId) {
      case 'project':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold">Project & Spatial Information</span>
              </div>
              <p className="text-blue-400 text-sm">Define your project boundaries and basic information.</p>
            </div>
            
            <MemoInputField 
              label="Project Name" 
              required 
              value={formData.project?.projectName || ''}
              onChange={handleInputChange('project', 'projectName')}
              placeholder="Enter project name"
            />
            <MemoInputField 
              label="Project ID" 
              required 
              value={formData.project?.projectId || ''}
              onChange={handleInputChange('project', 'projectId')}
              placeholder="Enter project identifier"
            />
            <MemoInputField 
              label="Area Boundaries" 
              type="number" 
              unit="ha"
              required 
              value={formData.project?.area || ''}
              onChange={handleInputChange('project', 'area')}
              placeholder="Enter area in hectares"
              step="0.01"
            />
            <FileUpload 
              label="Site/Strata Polygons" 
              accept=".shp,.kml,.geojson,.zip"
              onChange={handleFileUpload('project', 'polygons')}
              name="polygons"
              uploadedFiles={uploadedFiles}
            />
            <MemoTextArea 
              label="Project Description" 
              value={formData.project?.description || ''}
              onChange={handleInputChange('project', 'description')}
              placeholder="Describe the project objectives and scope..."
            />
          </div>
        );

      case 'remote':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Camera className="w-5 h-5 mr-2" />
                <span className="font-semibold">Remote Sensing Configuration</span>
              </div>
              <p className="text-blue-400 text-sm">Configure your remote sensing inputs and parameters.</p>
            </div>
            
            <MemoSelectField 
              label="Sensor Type" 
              options={['Landsat 8', 'Sentinel-2', 'MODIS', 'PlanetScope', 'Custom']}
              value={formData.remote?.sensorType || ''}
              onChange={handleInputChange('remote', 'sensorType')}
            />
            <MemoInputField 
              label="Spatial Resolution" 
              type="number" 
              unit="m"
              value={formData.remote?.resolution || ''}
              onChange={handleInputChange('remote', 'resolution')}
              placeholder="e.g., 10"
            />
            <MemoInputField 
              label="Acquisition Date" 
              type="date"
              value={formData.remote?.acquisitionDate || ''}
              onChange={handleInputChange('remote', 'acquisitionDate')}
            />
            <MemoInputField 
              label="Cloud Cover" 
              type="number" 
              unit="%"
              value={formData.remote?.cloudCover || ''}
              onChange={handleInputChange('remote', 'cloudCover')}
              placeholder="e.g., 15"
              step="0.1"
            />
            <MemoTextArea 
              label="Processing Steps" 
              value={formData.remote?.processingSteps || ''}
              onChange={handleInputChange('remote', 'processingSteps')}
              placeholder="Describe image processing and calibration steps..."
            />
          </div>
        );

      case 'vegetation':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Trees className="w-5 h-5 mr-2" />
                <span className="font-semibold">Vegetation Parameters</span>
              </div>
              <p className="text-blue-400 text-sm">Enter mangrove vegetation characteristics and measurements.</p>
            </div>
            
            <MemoSelectField 
              label="Dominant Species" 
              options={['Rhizophora mucronata', 'Avicennia marina', 'Sonneratia alba', 'Bruguiera gymnorrhiza', 'Mixed Species']}
              value={formData.vegetation?.species || ''}
              onChange={handleInputChange('vegetation', 'species')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MemoInputField 
                label="Average Tree Height" 
                type="number" 
                unit="m"
                value={formData.vegetation?.height || ''}
                onChange={handleInputChange('vegetation', 'height')}
                placeholder="e.g., 8.5"
                step="0.1"
              />
              <MemoInputField 
                label="DBH (Diameter at Breast Height)" 
                type="number" 
                unit="cm"
                value={formData.vegetation?.dbh || ''}
                onChange={handleInputChange('vegetation', 'dbh')}
                placeholder="e.g., 15.2"
                step="0.1"
              />
            </div>
            <MemoInputField 
              label="Tree Density" 
              type="number" 
              unit="trees/ha"
              value={formData.vegetation?.density || ''}
              onChange={handleInputChange('vegetation', 'density')}
              placeholder="e.g., 1200"
            />
            <FileUpload 
              label="Field Survey Data" 
              accept=".csv,.xlsx,.pdf"
              onChange={handleFileUpload('vegetation', 'surveyData')}
              name="surveyData"
              uploadedFiles={uploadedFiles}
            />
          </div>
        );

      case 'soil':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Droplets className="w-5 h-5 mr-2" />
                <span className="font-semibold">Soil & Sediment Analysis</span>
              </div>
              <p className="text-blue-400 text-sm">Provide soil sampling data and laboratory results.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Sample Depth" 
                type="number" 
                unit="cm"
                value={formData.soil?.depth || ''}
                onChange={handleInputChange('soil', 'depth')}
                placeholder="e.g., 30"
              />
              <InputField 
                label="Bulk Density" 
                type="number" 
                unit="g/cm³"
                value={formData.soil?.bulkDensity || ''}
                onChange={handleInputChange('soil', 'bulkDensity')}
                placeholder="e.g., 1.2"
                step="0.01"
              />
            </div>
            <InputField 
              label="Soil Organic Carbon" 
              type="number" 
              unit="%"
              value={formData.soil?.soc || ''}
              onChange={handleInputChange('soil', 'soc')}
              placeholder="e.g., 3.5"
              step="0.1"
            />
            <FileUpload 
              label="Laboratory Analysis Reports" 
              accept=".pdf,.docx,.xlsx"
              onChange={handleFileUpload('soil', 'labReports')}
              name="labReports"
              uploadedFiles={uploadedFiles}
            />
          </div>
        );

      case 'declaration':
        return (
          <div className="space-y-6">
            <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-emerald-300 mb-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Final Declaration</span>
              </div>
              <p className="text-emerald-400 text-sm">Review and confirm your submission.</p>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start space-x-3 p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 transition-colors">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  required
                  checked={formData.declaration?.dataAccuracy || false}
                  onChange={(e) => updateFormData('declaration', 'dataAccuracy', e.target.checked)}
                />
                <span className="text-blue-200 text-sm">
                  I certify that all monitoring data and supporting documents are accurate and compliant with <strong>Gold Standard Mangrove Methodology</strong> requirements.
                </span>
              </label>
              
              <label className="flex items-start space-x-3 p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 transition-colors">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  required
                  checked={formData.declaration?.qualityAssurance || false}
                  onChange={(e) => updateFormData('declaration', 'qualityAssurance', e.target.checked)}
                />
                <span className="text-blue-200 text-sm">
                  I confirm that all quality assurance procedures have been followed and that the data represents the actual project conditions.
                </span>
              </label>
            </div>
            
            <MemoInputField 
              label="Authorized Signatory" 
              required 
              value={formData.declaration?.signatory || ''}
              onChange={handleInputChange('declaration', 'signatory')}
              placeholder="Enter full name"
            />
            
            <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-700/30">
              <h4 className="text-blue-300 font-semibold mb-2">Submission Summary</h4>
              <div className="text-blue-400 text-sm space-y-1">
                <p>• Project: {formData.project?.projectName || 'Not specified'}</p>
                <p>• Area: {formData.project?.area || '0'} hectares</p>
                <p>• Sections Completed: {completedSections.size} of {sections.length}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-blue-400 mb-4">Section content coming soon...</div>
            <div className="text-blue-300 text-sm">This section is under development.</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/30 to-indigo-900/30 animate-pulse"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Cursor Effects */}
      <div 
        ref={glowRef}
        className="fixed w-96 h-96 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(4px)'
        }}
      />
      
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 border-2 border-blue-400 rounded-full pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/30"
        style={{
          boxShadow: '0 0 15px rgba(96, 165, 250, 0.4), inset 0 0 15px rgba(96, 165, 250, 0.2)'
        }}
      />

      {/* Feedback Notification */}
      {showFeedback && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl border ${
            feedbackType === 'success' 
              ? 'bg-emerald-900/90 border-emerald-600 text-emerald-100' 
              : 'bg-red-900/90 border-red-700 text-red-100'
          }`} style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
          }}>
            {feedbackMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border-b border-blue-800/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/methodologies')}
              className="flex items-center px-4 py-2 text-blue-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 border border-blue-800/30"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Methodologies
            </button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-white">Gold Standard - Mangrove MRV</h1>
              <p className="text-blue-300">Sustainable Management of Mangroves (2024)</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6 relative z-30">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4">Form Sections</h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button 
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 ${
                    index === currentSection 
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg` 
                      : 'text-blue-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                  style={{
                    boxShadow: index === currentSection ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none'
                  }}
                >
                  {section.icon}
                  <span className="ml-3 text-sm font-medium">{section.title}</span>
                  {completedSections.has(index) && index !== currentSection && (
                    <CheckCircle className="w-4 h-4 ml-auto text-emerald-400" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Progress */}
            <div className="mt-6 pt-6 border-t border-blue-800/30">
              <div className="flex justify-between text-sm text-blue-300 mb-2">
                <span>Progress</span>
                <span>{completedSections.size} of {sections.length}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
                  style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-blue-800/30 overflow-hidden">
            {/* Section Header */}
            <div className={`bg-gradient-to-r ${sections[currentSection].color} p-6 text-white`}>
              <h2 className="text-xl font-bold">{sections[currentSection].title}</h2>
              <p className="text-blue-100 text-sm mt-1">
                Section {currentSection + 1} of {sections.length}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {renderSectionContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-blue-800/30 p-6 bg-slate-800/40">
              <button 
                onClick={prevSection} 
                disabled={currentSection === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentSection === 0 
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-700/60 text-white hover:bg-slate-700/80 border border-blue-800/30 hover:border-blue-500/50'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-blue-300 text-sm">
                  {currentSection + 1} / {sections.length}
                </span>
              </div>
              
              {currentSection === sections.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl border border-emerald-500/30'
                  }`}
                  style={{
                    boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit Form
                    </>
                  )}
                </button>
              ) : (
                <button 
                  onClick={nextSection}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500/30"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldStandardForm;