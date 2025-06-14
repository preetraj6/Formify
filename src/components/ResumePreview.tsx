
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
    <div className="bg-white p-8 shadow-lg max-h-96 overflow-y-auto">
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{data.contact.fullName || 'Your Name'}</h1>
        <div className="text-gray-600 mt-2 space-y-1">
          {data.contact.email && <div>{data.contact.email}</div>}
          {data.contact.phone && <div>{data.contact.phone}</div>}
          {data.contact.location && <div>{data.contact.location}</div>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Experience</h2>
          {data.experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{exp.position || 'Position'}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-gray-700 mb-2">{exp.company}</div>
                {exp.description && (
                  <div className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Education</h2>
          {data.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree || 'Degree'}</h3>
                    <div className="text-gray-700">{edu.institution}</div>
                  </div>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.projects.some(project => project.title) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Projects</h2>
          {data.projects.map((project, index) => (
            project.title ? (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-800">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {data.awards.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Awards & Achievements</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full">
      <div className="p-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-700">Live Preview</h3>
          <p className="text-sm text-gray-500">Your resume updates as you type</p>
        </div>
        {renderModernTemplate()}
      </div>
    </Card>
  );
};

export default ResumePreview;
