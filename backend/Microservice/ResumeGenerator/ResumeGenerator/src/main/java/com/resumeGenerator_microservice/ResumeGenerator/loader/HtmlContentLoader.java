package com.resumeGenerator_microservice.ResumeGenerator.loader;
import com.resumeGenerator_microservice.ResumeGenerator.model.HtmlContent;
import com.resumeGenerator_microservice.ResumeGenerator.service.HtmlContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class HtmlContentLoader {

    @Autowired
    private HtmlContentService htmlContentService;

    // This method will automatically run when the application starts
    @Bean
    public ApplicationRunner insertHtmlContentOnStartup() {
        return args -> {
            // Define multiple HTML contents with manually assigned IDs
            List<HtmlContent> htmlContents = List.of(
                    new HtmlContent(1, """
                               <!DOCTYPE html>
                                                              <html lang="en">
                                                              <head>
                                                                  <meta charset="UTF-8">
                                                                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                  <title>#name's CV</title>
                                                                  <style>
                                                              	body {
                                                                  font-family: Arial, sans-serif;
                                                                  margin: 0;
                                                                  padding: 0;
                                                                  background-color: #f4f4f4;
                                                                  color: #333;
                                                              }
                                                              
                                                              .container {
                                                                  width: 80%;
                                                                  margin: auto;
                                                                  background: #fff;
                                                                  padding: 20px;
                                                                  border-radius: 8px;
                                                                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                                              }
                                                              
                                                              header {
                                                                  text-align: center;
                                                                  margin-bottom: 20px;
                                                              }
                                                              
                                                              header h1 {
                                                                  margin: 0;
                                                              }
                                                              
                                                              header p {
                                                                  color: #666;
                                                                  font-size: 14px;
                                                              }
                                                              
                                                              section {
                                                                  margin-bottom: 20px;
                                                              }
                                                              
                                                              section h2 {
                                                                  border-bottom: 2px solid #333;
                                                                  padding-bottom: 5px;
                                                              }
                                                              
                                                              .entry {
                                                                  margin-bottom: 15px;
                                                              }
                                                              
                                                              .entry h3 {
                                                                  margin: 0;
                                                                  color: #444;
                                                              }
                                                              
                                                              .entry p, .entry span {
                                                                  font-size: 14px;
                                                                  color: #555;
                                                              }
                                                              
                                                              .entry ul {
                                                                  margin: 5px 0 0 20px;
                                                                  padding: 0;
                                                              }
                                                              
                                                              .entry ul li {
                                                                  list-style-type: disc;
                                                                  font-size: 14px;
                                                                  color: #555;
                                                              }                      
                                                             .education-header {
                                                                 display: flex;
                                                                 justify-content: space-between;  /* Distributes space between the items */
                                                                 align-items: center;             /* Vertically aligns the content */
                                                               }
                                                               
                                                               .education-dates {
                                                                 margin-left: auto;               /* Ensures dates are aligned to the right */
                                                                 font-weight: normal;             /* Styling for dates */
                                                                 color: gray;                     /* Optional: set a color for the dates */
                                                               }
                                                               
                                                              
                                                              	</style>
                                                              </head>
                                                              <body>
                                                                  <div class="container">
                                                                      <header>
                                                                          <h1>#name</h1>
                                                                          <p>#location | <a href="#mailid">#mailid</a> | #number | <a href="#links">#links</a></p>
                                                                      </header>
                                                              		   <section>
                                                                          <h2>Summary</h2>
                                                                          <div class="entry">
                                                                              <p>#summary</p>
                                                                          </div>
                                                                      </section>
                                                              		 <section>
                                                                          <h2>Experience</h2>
                                                                         <p>#experience</p>
                                                                      </section>
                                                                      <section>
                                                                          <h2>Education</h2>
                                                                          <p>#education</p>
                                                                      </section>
                                                                      	<section>
                                                                          <h2>Technical Skills</h2>
                                                                            <div class="entry">
                                                                        <p>#techincalSkills</p>
                                                                      </div>
                                                                      </section>
                                                                      <section>
                                                                        <h2>Personal Projects</h2>
                                                                         #personalprojects
                                                                         </section>
                                                                         <section>
                                                                           <h2>Languages</h2>
                                                                           #language
                                                                            </section>
                                                                         </div>
                                                              </body>
                                                              </html> 
                            """),
                    new HtmlContent(2, """
                <!DOCTYPE html>
                <html>
                <body>

                <h1>#title</h1>
                <p>This is another paragraph.</p>

                </body>
                </html>
            """),
                    new HtmlContent(3, """
                <!DOCTYPE html>
                <html>
                <body>

                <h1>#content</h1>
                <p>Another example of HTML content.</p>

                </body>
                </html>
            """)
            );

            // Insert each HTML content into the database only if it doesn't exist
            for (HtmlContent content : htmlContents) {
                Optional<HtmlContent> existingContent = htmlContentService.findByTemplateId(content.getTemplateId());

                if (existingContent.isEmpty()) {
                    htmlContentService.addContent(content);
                    System.out.println("HTML content with ID " + content.getTemplateId() + " has been saved to the database.");
                } else {
                    System.out.println("HTML content with ID " + content.getTemplateId() + " already exists in the database.");
                }
            }
        };
    }
}