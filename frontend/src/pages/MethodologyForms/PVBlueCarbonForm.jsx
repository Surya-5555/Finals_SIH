import React, { useState, useEffect, useRef, useMemo, useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Upload, MapPin, Trees, Mountain, 
  Droplets, FlaskConical, Wind, Settings, Camera, FileText, Shield, 
  AlertTriangle, Clock, CheckCircle, Users, Leaf, Home
} from 'lucide-react';

const PVBlueCarbonForm = () => {
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
    { id: 'project', title: 'A. Project Information', icon: <FileText className="w-5 h-5" />, color: primaryColor },
    { id: 'mapping', title: 'B. Area Mapping & Boundaries', icon: <MapPin className="w-5 h-5" />, color: primaryColor },
    { id: 'cover', title: 'C. Land Cover Change / Stratification', icon: <Leaf className="w-5 h-5" />, color: primaryColor },
    { id: 'drivers', title: 'D. Drivers of Deforestation', icon: <AlertTriangle className="w-5 h-5" />, color: primaryColor },
    { id: 'vegetation', title: 'E. Vegetation Structure & Biomass', icon: <Trees className="w-5 h-5" />, color: primaryColor },
    { id: 'soil', title: 'F. Soil Organic Carbon (SOC)', icon: <Mountain className="w-5 h-5" />, color: primaryColor },
    { id: 'emissions', title: 'G. Emission Factors', icon: <Wind className="w-5 h-5" />, color: primaryColor },
    { id: 'photos', title: 'H. Photo Documentation', icon: <Camera className="w-5 h-5" />, color: primaryColor },
    { id: 'remote', title: 'I. Remote Sensing Methods', icon: <Settings className="w-5 h-5" />, color: primaryColor },
    { id: 'salinity', title: 'J. Salinity & Hydrology Change', icon: <Droplets className="w-5 h-5" />, color: primaryColor },
    { id: 'management', title: 'K. Project Intervention Logs', icon: <Users className="w-5 h-5" />, color: primaryColor },
    { id: 'fuel', title: 'L. Fossil Fuel Use', icon: <FlaskConical className="w-5 h-5" />, color: primaryColor },
    { id: 'law', title: 'M. Regulatory Surplus Proof', icon: <Shield className="w-5 h-5" />, color: primaryColor },
    { id: 'historic', title: 'N. Historic Data', icon: <Clock className="w-5 h-5" />, color: primaryColor },
    { id: 'declaration', title: 'O. Declaration & Compliance', icon: <CheckCircle className="w-5 h-5" />, color: primaryColor },
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
        'project.projectName', 'project.projectId', 'project.activityType',
        'mapping.referenceRegion', 'vegetation.species'
      ];
      
      const missingFields = requiredFields.filter(field => {
        const [section, fieldName] = field.split('.');
        return !formData[section]?.[fieldName];
      });

      if (missingFields.length > 0) {
        throw new Error('Please fill all required fields');
      }

      setFeedbackType('success');
      setFeedbackMessage('Plan Vivo Blue Carbon form submitted successfully! Your project is now under review.');
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
                <FileText className="w-5 h-5 mr-2" />
                <span className="font-semibold">Project Information</span>
              </div>
              <p className="text-blue-400 text-sm">Enter basic project details and registration information.</p>
            </div>
            
            <MemoInputField 
              label="Project Name / ID" 
              required 
              value={formData.project?.projectName || ''}
              onChange={handleInputChange('project', 'projectName')}
              placeholder="Enter project name and identifier"
            />
            <MemoSelectField 
              label="Activity Type" 
              options={['Restoration', 'Conservation', 'Sustainable wood harvest', 'Mixed activities']}
              required
              value={formData.project?.activityType || ''}
              onChange={handleInputChange('project', 'activityType')}
            />
            <FileUpload 
              label="Registration Documentation" 
              accept=".pdf,.docx,.jpg,.png"
              onChange={handleFileUpload('project', 'registrationDocs')}
              name="registrationDocs"
              uploadedFiles={uploadedFiles}
            />
            <MemoTextArea 
              label="Project Description" 
              value={formData.project?.description || ''}
              onChange={handleInputChange('project', 'description')}
              placeholder="Describe the project objectives, scope, and community involvement..."
            />
          </div>
        );

      case 'mapping':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold">Area Mapping & Boundaries</span>
              </div>
              <p className="text-blue-400 text-sm">Define project boundaries and spatial configuration.</p>
            </div>
            
            <FileUpload 
              label="GPS Polygons / Boundaries" 
              accept=".shp,.kml,.geojson,.zip"
              onChange={handleFileUpload('mapping', 'boundaries')}
              name="boundaries"
              uploadedFiles={uploadedFiles}
            />
            <FileUpload 
              label="Strata Layers" 
              accept=".shp,.kml,.geojson,.tif"
              onChange={handleFileUpload('mapping', 'strataLayers')}
              name="strataLayers"
              uploadedFiles={uploadedFiles}
            />
            <MemoSelectField 
              label="Reference Region" 
              options={['National', 'Sub-unit', 'GMW-defined', 'Custom delineation']}
              required
              value={formData.mapping?.referenceRegion || ''}
              onChange={handleInputChange('mapping', 'referenceRegion')}
            />
            <MemoInputField 
              label="Total Project Area" 
              type="number" 
              unit="ha"
              value={formData.mapping?.totalArea || ''}
              onChange={handleInputChange('mapping', 'totalArea')}
              placeholder="Enter total project area"
              step="0.01"
            />
          </div>
        );

      case 'vegetation':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Trees className="w-5 h-5 mr-2" />
                <span className="font-semibold">Vegetation Structure & Biomass</span>
              </div>
              <p className="text-blue-400 text-sm">Record vegetation characteristics and biomass measurements.</p>
            </div>
            
            <MemoInputField 
              label="Tree/Sapling Count per Plot" 
              type="number"
              value={formData.vegetation?.treeCount || ''}
              onChange={handleInputChange('vegetation', 'treeCount')}
              placeholder="e.g., 25"
            />
            <MemoInputField 
              label="Species Name" 
              required
              value={formData.vegetation?.species || ''}
              onChange={handleInputChange('vegetation', 'species')}
              placeholder="Enter dominant species"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MemoInputField 
                label="DBH" 
                type="number" 
                unit="cm"
                value={formData.vegetation?.dbh || ''}
                onChange={handleInputChange('vegetation', 'dbh')}
                placeholder="e.g., 15"
                step="0.1"
              />
              <MemoInputField 
                label="Height" 
                type="number" 
                unit="m"
                value={formData.vegetation?.height || ''}
                onChange={handleInputChange('vegetation', 'height')}
                placeholder="e.g., 5.2"
                step="0.1"
              />
            </div>
            <FileUpload 
              label="Geo-tagged Photos" 
              accept=".jpg,.png,.heic"
              onChange={handleFileUpload('vegetation', 'photos')}
              name="photos"
              uploadedFiles={uploadedFiles}
            />
            <MemoTextArea 
              label="Vegetation Notes" 
              value={formData.vegetation?.notes || ''}
              onChange={handleInputChange('vegetation', 'notes')}
              placeholder="Additional observations about vegetation health, density, etc."
            />
          </div>
        );

      case 'soil':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Mountain className="w-5 h-5 mr-2" />
                <span className="font-semibold">Soil Organic Carbon Analysis</span>
              </div>
              <p className="text-blue-400 text-sm">Provide soil sampling data and carbon measurements.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MemoInputField 
                label="Depth" 
                type="number" 
                unit="cm"
                value={formData.soil?.depth || ''}
                onChange={handleInputChange('soil', 'depth')}
                placeholder="e.g., 30"
              />
              <MemoInputField 
                label="Bulk Density" 
                type="number" 
                unit="g/cm³"
                value={formData.soil?.bulkDensity || ''}
                onChange={handleInputChange('soil', 'bulkDensity')}
                placeholder="e.g., 1.2"
                step="0.01"
              />
            </div>
            <MemoInputField 
              label="Soil Organic Carbon" 
              type="number" 
              unit="%"
              value={formData.soil?.soc || ''}
              onChange={handleInputChange('soil', 'soc')}
              placeholder="e.g., 3.5"
              step="0.1"
            />
            <FileUpload 
              label="Lab Results" 
              accept=".pdf,.xlsx,.csv"
              onChange={handleFileUpload('soil', 'labResults')}
              name="labResults"
              uploadedFiles={uploadedFiles}
            />
            <MemoInputField 
              label="Sampling Date" 
              type="date"
              value={formData.soil?.samplingDate || ''}
              onChange={handleInputChange('soil', 'samplingDate')}
            />
          </div>
        );

      case 'management':
        return (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-blue-300 mb-2">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-semibold">Project Intervention Logs</span>
              </div>
              <p className="text-blue-400 text-sm">Record management activities and community involvement.</p>
            </div>
            
            <MemoSelectField 
              label="Event Type" 
              options={['Site Preparation', 'Planting', 'Harvest', 'Burning', 'Maintenance', 'Monitoring']}
              value={formData.management?.eventType || ''}
              onChange={handleInputChange('management', 'eventType')}
            />
            <MemoInputField 
              label="Event Date" 
              type="date"
              value={formData.management?.eventDate || ''}
              onChange={handleInputChange('management', 'eventDate')}
            />
            <MemoInputField 
              label="Number of Participants" 
              type="number"
              value={formData.management?.participants || ''}
              onChange={handleInputChange('management', 'participants')}
              placeholder="e.g., 15"
            />
            <FileUpload 
              label="Geo-tagged Photos" 
              accept=".jpg,.png,.heic"
              onChange={handleFileUpload('management', 'eventPhotos')}
              name="eventPhotos"
              uploadedFiles={uploadedFiles}
            />
            <MemoTextArea 
              label="Activity Description" 
              value={formData.management?.description || ''}
              onChange={handleInputChange('management', 'description')}
              placeholder="Describe the intervention activities and outcomes..."
            />
          </div>
        );

      case 'declaration':
        return (
          <div className="space-y-6">
            <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 mb-4">
              <div className="flex items-center text-emerald-300 mb-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Final Declaration & Compliance</span>
              </div>
              <p className="text-emerald-400 text-sm">Review and confirm your submission according to Plan Vivo standards.</p>
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
                  I confirm all data are accurate, and comply with Plan Vivo MRV and crediting requirements.
                </span>
              </label>
              
              <label className="flex items-start space-x-3 p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 transition-colors">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  required
                  checked={formData.declaration?.communityBenefits || false}
                  onChange={(e) => updateFormData('declaration', 'communityBenefits', e.target.checked)}
                />
                <span className="text-blue-200 text-sm">
                  I confirm that community benefits and participation have been properly documented and implemented.
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
            
            <MemoTextArea 
              label="Additional Comments" 
              value={formData.declaration?.comments || ''}
              onChange={handleInputChange('declaration', 'comments')}
              placeholder="Any additional information or context for the reviewers..."
            />
            
            <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-700/30">
              <h4 className="text-blue-300 font-semibold mb-2">Submission Summary</h4>
              <div className="text-blue-400 text-sm space-y-1">
                <p>• Project: {formData.project?.projectName || 'Not specified'}</p>
                <p>• Activity Type: {formData.project?.activityType || 'Not specified'}</p>
                <p>• Area: {formData.mapping?.totalArea || '0'} hectares</p>
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
              <h1 className="text-2xl font-bold text-white">Plan Vivo Blue Carbon MRV Data Entry (v1.0)</h1>
              <p className="text-blue-300">Structured form for monitoring & reporting</p>
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

export default PVBlueCarbonForm;