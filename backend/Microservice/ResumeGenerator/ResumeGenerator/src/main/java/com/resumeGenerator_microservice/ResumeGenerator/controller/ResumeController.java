package com.resumeGenerator_microservice.ResumeGenerator.controller;

import com.resumeGenerator_microservice.ResumeGenerator.model.*;
import com.resumeGenerator_microservice.ResumeGenerator.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/resume")
public class ResumeController {

    @Autowired
    private UserDetailsRest userDetailsRest;

    @Autowired
    private SummaryRest summaryRest;

    @Autowired
    private ExperienceRest experienceRest;

    @Autowired
    private EducationRest educationRest;

    @Autowired
    private CommonServiceRest commonServiceRest;

    @Autowired
    private HtmlContentService htmlContentService;

    @Autowired
    private UserResumeService userResumeService;

    @Autowired
    private PdfService pdfService;

    @PostMapping("/generateResume/{userId}")
    public ResponseEntity<?> generateResume(@PathVariable int userId){
        try {
            int templateId =1;
            UserDetails userDetails = userDetailsRest.fetchDataFromUserSerivce(userId);
            Summary summary = summaryRest.fetchDataFromSummaryService(userId);
            List<Experience> experiences = experienceRest.fetchDataFromExperienceService(userId);
            Skills skills = experienceRest.fetchDataFromSkillsService(userId);
            List<Education> educations = educationRest.fetchDataFromEducationService(userId);
            List<Language> languages = commonServiceRest.fetchDataFromLanguageCommonService(userId);
//            List<Certificate> certificateList = commonServiceRest.fetchDataFromCertificateCommonService(userId);
            List<Project> projects = commonServiceRest.etchDataFromProjectCommonService(userId);
            Optional<HtmlContent> htmlContent =htmlContentService.findByTemplateId(templateId);
            byte[] resume =  resumeTemplate(htmlContent,templateId,userId,userDetails, summary, experiences, educations, skills, projects, languages);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume.pdf\"") // Optional: Suggest a filename for download
                    .contentType(MediaType.APPLICATION_PDF) // Set correct content type
                    .body(resume);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    private byte[] resumeTemplate(Optional<HtmlContent> htmlContent, int templateId, int userId, UserDetails userDetails, Summary summary,List<Experience> experiences, List<Education> educations, Skills skills, List<Project> projects, List<Language> languages) throws IOException {
        byte[] resume = new byte[0];
//        if (htmlContent.isPresent()) {
            // Get the HTML template from the HtmlContent object
            String template = htmlContent.get().getTemplate();

            // Replace #name with the actual name in the template
            template = template.replace("#name", userDetails.getName());
            template =template.replace("#location", userDetails.getAddress());
            template =template.replace("#mailid", userDetails.getMailId());
            template =template.replace("#number", String.valueOf(userDetails.getNumber()));
            template =template.replace("#links", userDetails.getLinks());
            template =template.replace("#summary", summary.getSummary());

        StringBuilder experiencesStringBuilder = new StringBuilder();

        for (Experience exp : experiences) {
            String experienceSection = """
                     <div class="entry">
                     <h3>#experiencedesignation - #company</h3>
                     <p>#experienceLocation</p>
                     <p>Skills - #experienceskills<p>
                     <span>#experiencestartDate – #experienceendDate</span>
                     <ul>
                     #tasks
                     </ul>
                     </div>
                    """;

            experienceSection = experienceSection.replace("#experiencedesignation", exp.getDesignation());
            experienceSection = experienceSection.replace("#company", exp.getCompany());
            experienceSection = experienceSection.replace("#experienceLocation", exp.getLocation());

            String skill = String.join(", ", exp.getSkills());
            experienceSection = experienceSection.replace("#experienceskills", skill);
            experienceSection = experienceSection.replace("#experiencestartDate", String.valueOf(exp.getStartDate()));
            experienceSection = experienceSection.replace("#experienceendDate", exp.getEndDate() != null ? String.valueOf(exp.getEndDate()) : exp.getStringEndDate());

            String tasks = exp.getTasks();
            String[] taskLines = tasks.split("\n");
            StringBuilder tasksBuilder = new StringBuilder();
            for (String task : taskLines) {
                task = task.replace("•", "").replace(".", "").trim();
                if (!task.isEmpty()) {
                    tasksBuilder.append("<li>").append(task).append("</li>");
                }
            }
            experienceSection = experienceSection.replace("#tasks", tasksBuilder.toString());

            experiencesStringBuilder.append(experienceSection);
        }

        template = template.replace("#experience", experiencesStringBuilder.toString());


        StringBuilder educationStringBuilder = new StringBuilder();

        for (Education education : educations) {
            String educationSection = """
                    <div class="entry">
                             <div class="education-header">
                               <h3>#college</h3>
                               <span class="education-dates">#educationStartDate – #educationEndDate</span>
                             </div>
                             <p>#program in #course</p>
                             <p>CGPA: #CGPA</p>
                             #specializationTag
                           </div>
                    """;

            educationSection = educationSection.replace("#college", education.getCollege());
            educationSection = educationSection.replace("#program", education.getProgram());
            educationSection = educationSection.replace("#course", education.getCourse());
            educationSection = educationSection.replace("#educationStartDate", String.valueOf(education.getStartDate()));
            educationSection = educationSection.replace("#educationEndDate", education.getEndDate() != null ? String.valueOf(education.getEndDate()) : education.getStringEndDate());
            educationSection = educationSection.replace("#CGPA", String.valueOf(education.getCgpa()));
            if (education.getSpecialization() == null || education.getSpecialization().isEmpty()) {
                educationSection = educationSection.replace("#specializationTag", ""); // Remove the tag
            } else {
                educationSection = educationSection.replace("#specializationTag", "<p>Specialization - " + education.getSpecialization() + "</p>");
            }
            educationStringBuilder.append(educationSection);
        }

        template = template.replace("#education", educationStringBuilder.toString());

        List<String> skillList = skills.getSkillData();
        String skillString = String.join(", ", skillList);
        template = template.replace("#techincalSkills", skillString);


        StringBuilder projectStringBuilder = new StringBuilder();
        for (Project project : projects) {
            String projectSection = """
                    <div class="entry">
                    <div class="education-header">
                    <h3>#projectName</h3>
                    <span class="education-dates">#projectStartDate – #projectEndDate</span>
                    </div>
                    <p>Skills - #projectSkills</p>
                    <ul>
                      #projectDescription
                    </ul>
                    </div>
                    """;

            projectSection = projectSection.replace("#projectName", project.getProjectName());
            projectSection = projectSection.replace("#projectStartDate", String.valueOf(project.getStartDate()));
            projectSection = projectSection.replace("#projectEndDate", project.getEndDate() != null ? String.valueOf(project.getEndDate()) : project.getStringEndDate());
            String skill = String.join(", ", project.getSkills());
            projectSection = projectSection.replace("#projectSkills",skill);

            String tasks = project.getDescription();
            String[] taskLines = tasks.split("\n");
            StringBuilder tasksBuilder = new StringBuilder();
            for (String task : taskLines) {
                task = task.replace("•", "").replace(".", "").trim();
                if (!task.isEmpty()) {
                    tasksBuilder.append("<li>").append(task).append("</li>");
                }
            }
            projectSection = projectSection.replace("#projectDescription", tasksBuilder.toString());

            projectStringBuilder.append(projectSection);
        }

        template = template.replace("#personalprojects", projectStringBuilder.toString());


        StringBuilder languageStringBuilder = new StringBuilder();

        for (Language language : languages) {
            String languageSection = """
                    <div class="entry">
                    <h3>#languageName - <span>#level</span></h3>
                    </div>
                    """;

            languageSection = languageSection.replace("#languageName", language.getLanguage());
            languageSection = languageSection.replace("#level", language.getLevel());
            languageStringBuilder.append(languageSection);
        }

        template = template.replace("#language", languageStringBuilder.toString());



        String personalizedContent = template;
            Optional<UserResume> existingUserResume = userResumeService.findByTemplateIdAndUserId(templateId, userId);

            UserResume userResume;
            if (existingUserResume.isPresent()) {
                // Record exists, so update the personalizedContent
                userResume = existingUserResume.get();
                userResume.setResume(personalizedContent); // Update the content
                userResumeService.update(userResume);  // Save the updated record
            } else {
                userResume = new UserResume(templateId, userId, personalizedContent);
                userResumeService.userResumeService(userResume);
            }
            resume = pdfService.convertHtmlToPdf(personalizedContent);

//        }
        return resume;
    }
}
