
import { Card } from "@/components/ui/card";

interface ResumeData {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
  }>;
  awards: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const renderModernTemplate = () => (
    <div className="bg-white p-6 shadow-lg max-h-80 overflow-y-auto rounded-lg">
      <div className="border-b-2 border-indigo-600 pb-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">{data.contact.fullName || 'Your Name'}</h1>
        <div className="text-gray-600 mt-2 space-y-1 text-sm">
          {data.contact.email && <div>{data.contact.email}</div>}
          {data.contact.phone && <div>{data.contact.phone}</div>}
          {data.contact.location && <div>{data.contact.location}</div>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
        </div>
      )}

      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-3">Experience</h2>
          {data.experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{exp.position || 'Position'}</h3>
                  <span className="text-xs text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-gray-700 mb-2 text-sm">{exp.company}</div>
                {exp.description && (
                  <div className="text-gray-600 text-xs whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-3">Education</h2>
          {data.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{edu.degree || 'Degree'}</h3>
                    <div className="text-gray-700 text-sm">{edu.institution}</div>
                  </div>
                  <span className="text-xs text-gray-600">{edu.year}</span>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.projects.some(project => project.title) && (
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-3">Projects</h2>
          {data.projects.map((project, index) => (
            project.title ? (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-800 text-sm">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-600 text-xs">{project.description}</p>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.awards.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-semibold text-indigo-600 mb-3">Awards & Achievements</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            {data.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <div className="p-4">
        <div className="text-center mb-4">
          <h3 className="font-display font-semibold text-gray-800">Live Preview</h3>
          <p className="text-sm text-gray-500">Your resume updates as you type</p>
        </div>
        {renderModernTemplate()}
      </div>
    </Card>
  );
};

export default ResumePreview;
