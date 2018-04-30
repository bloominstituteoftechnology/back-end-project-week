const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// Mongo code
// const surveyRouter = require('./zServerFiles/Surveys/SurveyRouter.js');
// const questionRouter = require('./zServerFiles/Question/QuestionRouter.js');

// mongoose
//   .connect('mongodb://localhost/survey')
//   .then(() => console.log('\n=== connected to Mongo ===\n'))
//   .catch(err => console.log('error connecting to DB'));

// server.use('/api/surveys', surveyRouter);
// server.use('/api/questions', questionRouter);

server.get('/', (req, res) => res.send('API running...'));

const Surveys = [
  {
    SurveyName: 'Onsite Financial Application Questionnaire',
    Questions: [
      {
        Category: 'Access Control',
        questions: [
          {
            'AC-2 Account Management':
              'AC-2: Our organization manages user and group access in our ERP (Financial Application). Establish access, periodic reviews, deactivation or disable. Automatic disable temporary and inactive accounts. Limit use of Administrator or Root accounts.'
          },
          {
            'AC-5 Separation of Duties':
              'AC-5: Our organization implements separation of duties to prevent malevolent activity without collusion.   (e.g. development staff separate from live system; someone other than system admins review audit logs of system admin actions on the ERP.)'
          },
          {
            'AC-6 Least Privilege':
              'AC-6: Our organization limits access to only the needed levels for people to complete their job functions. (Least access principle)'
          },
          {
            'AC-7 Unsuccessful Logon Attempts':
              'AC-7: Our systems have a limit on the number of unsuccessful long on attempts within a specific time frame. The account is either automatically locked out and reinstated after a specified time period or manually reset by a system admin.'
          },
          {
            'AC-11 Session Lock':
              'AC-11: Our workstations log users off or lock them out after a specified time period of inactivity.'
          },
          {
            'AC-12 Session Termination':
              'AC-12: Our applications and remote sessions log users off or lock them out after a specified time period of inactivity.  '
          },
          {
            'AC-14 Permitted Actions Without Identification or Authentication':
              'AC-14: Our organization has documented, with supporting rationale, what actions users can perform without identification or authentication. (If everyone needs an account to access resources then select (IP) In Place.  This means you do not allow people to login without a username and password.)'
          },
          {
            'AC-17 Remote Access':
              'AC-17: Our organization restricts or does not allow for remote access. Remote access is controlled, authorized, monitored, encrypted and enforced.'
          }
        ]
      },
      {
        Category: 'Audit and Accountability',
        questions: [
          {
            'AU-2 Audit Events':
              'AU-2: Our organization has determined what events should be logged to the point that after-the-fact investigations of incidents will have sufficient information.'
          },
          {
            'AU-3 Content of Audit Records':
              'AU-3: At a minimum, event logs establish what type of event occurred, date and time, the source, the outcome (success or failure), and the identity of any user associated with the event'
          },
          {
            'AU-4 Audit Storage Capacity':
              'AU-4: Our organization has enough storage space to maintain all audit (event) logs for 6 months or more.'
          },
          {
            'AU-5 Response to Audit Processing Failures':
              'AU-5: Alerts are sent out in the event that the audit (event) logs fail.'
          },
          {
            'AU-6 Audit Review, Analysis, and Reporting':
              'AU-6: Our organization reviews and analyzes audit (event) logs for indications of inappropriate or unusual activity.'
          },
          {
            'AU-8 Time Stamps':
              'AU-8: All system clocks are synchronized with other network for audit log correlation.'
          },
          {
            'AU-12 Audit Generation':
              'AU-12: Audit (event) logs turned on for all necessary systems.'
          }
        ]
      },
      {
        Category: 'Contingency Planning',
        questions: [
          {
            'CP-6 Alternate Storage Site':
              'CP-6: 1.) Our organization has an alternate storage site for backups including agreements to protect backups and access to backups as needed.  2.) Our organization’s alternative storage site for backups is far enough away from our data center as to not be'
          },
          {
            'CP-7 Alternate Processing Site':
              'CP-7: 1.) Our organization has an alternate processing site for our critical systems including everything in order to resume operations for essential missions and business functions. 2.) Our organization has determined the maximum amount of downtime our or'
          },
          {
            'CP-9 Information System Backup':
              'CP-9: 1.) Our backups contain all the information necessary to recover the critical systems and data. 2.) Our backups are protected during storage and transportation. 3.) Our organization tests backups regularly to ensure they can be recovered.'
          }
        ]
      },
      {
        Category: 'Identification and Authentication',
        questions: [
          {
            'IA-2 Identification and Authentication (Organizational Users)':
              'IA-2: Our organization requires users to use unique logon accounts for the ERP. (e.g.no shared accounts even for root and administrator.)'
          },
          {
            'IA-4 Identifier Management':
              'IA-4: Our organization periodically reviews and disables the user accounts in the ERP system after 90 day period of inactivity. '
          },
          {
            'IA-5 Authenticator Management':
              'IA-5: Our organization requires the use of 1.) complex passwords, 2.) passwords to change regularly and 3.) users not to use their previous password for the ERP system.'
          }
        ]
      },
      {
        Category: 'Systems and Services Acquisition',
        questions: [
          {
            'SA-10 Developer Configuration Management':
              'SA-10: Our organization requires that developers/integrators manage and control changes to systems and only implement organization-approved changes. [This is only applicable if the organization has developed the financial application (ERP) in house or if custom coding has been done to the financial application (ERP).]'
          },
          {
            'SA-11 Developer Security Testing and Evaluation':
              'SA-11: Our organization requires that developers/integrators test systems and changes to the system for vulnerabilities and flaws prior to deployment in the live environment.  [This is only applicable if the organization has developed the financial application (ERP) in house or if custom coding has been done to the financial application (ERP).]'
          }
        ]
      },
      {
        Category: 'System and Communications Protection',
        questions: [
          {
            'SC-4 Information in Shared Resources':
              'SC-4: 1.) Our critical systems are on dedicated servers and databases and do not share resource with other systems. 2.) Our critical systems prevent unauthorized and unintended data transfer via shared resources.'
          }
        ]
      },
      {
        Category: 'System and Information Integrity',
        questions: [
          {
            'SI-10 Information Input Validation':
              'SI-10: Financial application (ERP) checks the validity of information inputs. (E.g. only numbers can be put in number fields, only zip codes can be put in zip code fields, etc…).'
          },
          {
            'SI-11 Error Handling':
              'SI-11: Critical systems identify potentially security-relevant error conditions; generates error messages that provide information necessary for corrective actions (alerts, audit or event logs).'
          }
        ]
      }
    ]
  },
  {
    SurveyName: '3rd Party/Cloud Financial Application Questionnaire',
    Questions: [
      {
        Category: 'Financial Application Questionnaire',
        questions: [
          {
            'CSP-01 Third Party Service Provider Risk Assessment':
              'The organization performed a risk assessment before implementing a cloud solution.'
          },
          {
            'CSP-02 Annual Risk Assessment':
              'The organization performs ongoing risks assessments (at least annually) of the cloud solution.'
          },
          {
            'CSP-03 Compensating Controls':
              'The organization implements compensating controls for risks found in the risk assessments.  (If risks are at an acceptable level answer N/A)'
          },
          {
            'CSP-04 Service Level Agreement':
              'The cloud service solution had defined and documented Service Level Agreement (SLA) that meets the business requirements of the organization.'
          },
          {
            'CSP-05 Breach Notification':
              'The cloud service provider has a process for breach notification.'
          },
          {
            'CSP-06 Timely Breach Notification':
              'The cloud service provider will notify the organization of any breach of the organization’s data within 24 hours.'
          },
          {
            'CSP-07 Transborder Data Flow and Storage':
              'The cloud service solution does not store the organization’s data outside the United States.'
          },
          {
            'CSP-08 eDiscovery, Litigation Hold, Forensics':
              'The cloud service solution provides for legal controls such as eDiscovery, litigation hold, and forensics.'
          },
          {
            'CSP-09 Audit':
              'The organization regularly reviews independent audits (e.g. SAS 70, SSAE 16, ISAE) conduction on the cloud service solution to determine if the risk remains acceptable.'
          },
          {
            'CSP-10 Disengagement':
              'The cloud service provider has written provisions for disengagement and data migration.  Our organization has written provisions to get organizational data back provided termination of service from either party.'
          }
        ]
      },
      {
        Category: 'Access Control',
        questions: [
          {
            'CSP-11 Cloud Access Control':
              'The cloud service solution provides the organization a means to manage user accounts and access controls.'
          },
          {
            'AC-2 Account Management':
              'AC-2: Our organization manages user and group access in our ERP (Financial Application) [cloud solution]. Establish access, periodic reviews, deactivation or disable. Automatic disable temporary and inactive accounts. Limit use of Administrator or Root accounts.'
          },
          {
            'AC-5 Separation of Duties':
              'AC-5: Our organization implements separation of duties to prevent malevolent activity without collusion.   (e.g. development staff separate from live system; someone other than system admins review audit logs of system admin actions on the ERP.)'
          },
          {
            'AC-6 Least Privilege':
              'AC-6: Our organization limits access to only the needed levels for people to complete their job functions. (Least access principle)'
          },
          {
            'AC-7 Unsuccessful Logon Attempts':
              'AC-7: Our cloud solution has a limit on the number of unsuccessful long on attempts within a specific time frame. The account is either automatically locked out and reinstated after a specified time period or manually reset by a system admin.'
          },
          {
            'AC-11 Session Lock':
              'AC-11: Our workstations log users off or lock them out after a specified time period of inactivity.'
          },
          {
            'AC-12 Session Termination':
              'AC-12: Our applications and remote sessions log users off or lock them out after a specified time period of inactivity.  '
          },
          {
            'AC-14 Permitted Actions Without Identification or Authentication':
              'AC-14: Our organization has documented, with supporting rationale, what actions users can perform without identification or authentication.'
          },
          {
            'AC-17 Remote Access':
              'AC-17: Our organization restricts or does not allow for remote access. Remote access is controlled, authorized, monitored, encrypted and enforced.'
          }
        ]
      },
      {
        Category: 'Audit and Accountability',
        questions: [
          {
            'AU-2 Audit Events':
              'AU-2: Our organization has determined what events should be logged to the point that after-the-fact investigations of incidents will have sufficient information.'
          },
          {
            'AU-3 Content of Audit Records':
              'AU-3: At a minimum, event logs establish what type of event occurred, date and time, the source, the outcome (success or failure), and the identity of any user associated with the event'
          },
          {
            'AU-6 Audit Review, Analysis, and Reporting':
              'AU-6: Our organization reviews and analyzes audit (event) logs for indications of inappropriate or unusual activity.  The organization regularly reviews cloud service solution audit/event logs for suspicious activity or policy violations.'
          },
          {
            'AU-12 Audit Generation':
              'AU-12: Audit (event) logs turned on for the Cloud Solution'
          }
        ]
      },
      {
        Category: 'Contingency Planning',
        questions: [
          {
            'CP-9 Information System Backup':
              'CP-9: The Cloud Service Provider performs backups of all data in the service and a means to recover the data.'
          }
        ]
      },
      {
        Category: 'Identification and Authentication',
        questions: [
          {
            'IA-2 Identification and Authentication (Organizational Users)':
              'IA-2: Our organization requires users to use unique logon accounts for the ERP. (e.g.no shared accounts even for root and administrator.)'
          },
          {
            'IA-4 Identifier Management':
              'IA-4: Our organization periodically reviews and disables the user accounts in the ERP system after 90 day period of inactivity. '
          },
          {
            'IA-5 Authenticator Management':
              'IA-5: Our organization requires the use of 1.) complex passwords, 2.) passwords to change regularly and 3.) users not to use their previous password for the ERP system.'
          }
        ]
      }
    ]
  },
  {
    SurveyName: 'Onsite Information Systems Questionnaire',
    Questions: [
      {
        Category: 'Access Control',
        questions: [
          {
            'AC-1 Access Control Policy and Procedures':
              'AC-1: Our organization has a written cyber-security (IT) policy or procedures that cover Access Control (e.g. setup users, etc…)'
          },
          {
            'AC-2 Account Management':
              'AC-2: Our organization manages user and group access. Establish access, periodic reviews, deactivation or disable. Automatic disable temporary and inactive accounts. Limit use of Administrator or Root accounts.'
          },
          {
            'AC-3 Access Enforcement':
              'AC-3: Our organization’s information systems requires user accounts for access to systems and data.  (No anonymous access for internal systems)'
          },
          {
            'AC-4 Information Flow Enforcement':
              'AC-4: Our organization has information flow controls. (e.g. use of SSL, blocking outside traffic from spoofing internal addresses, packet filtering and limiting transmission based on type of data e.g. limits on emailing Social Security Numbers)'
          },
          {
            'AC-5 Separation of Duties':
              'AC-5: Our organization implements separation of duties. (To prevent malevolent activity without collusion) For example, development staff separate from live system staff; someone other than system admins review audit logs of system admin actions.'
          },
          {
            'AC-6 Least Privilege':
              'AC-6: Our organization limits access to only the needed levels for people to complete their job functions. (Least access principle)'
          },
          {
            'AC-7 Unsuccessful Logon Attempts':
              'AC-7: Our systems have a limit on the number of unsuccessful long on attempts within a specific time frame. The account is either automatically locked out and reinstated after a specified time period or manually reset by a system admin.'
          },
          {
            'AC-8 System Use Notification':
              'AC-8: Our workstations display an approved system use notification message or banner before granting access to the system that provides privacy and security notices. (e.g. log-on banner)'
          },
          {
            'AC-11 Session Lock':
              'AC-11: Our workstations log users off or lock them out after a specified time period of inactivity.'
          },
          {
            'AC-12 Session Termination':
              'AC-12: Our applications and remote sessions log users off or lock them out after a specified time period of inactivity.  '
          },
          {
            'AC-14 Permitted Actions Without Identification or Authentication':
              'AC-14: Our organization has documented, with supporting rationale, what actions users can perform without identification or authentication.  (If everyone needs an account to access resources then select (IP) In Place.  This means you do not allow people to login without a username and password.)'
          },
          {
            'AC-17 Remote Access':
              'AC-17: Our organization restricts or does not allow for remote access. Remote access is controlled, authorized, monitored, encrypted and enforced.'
          },
          {
            'AC-18 Wireless Access':
              'AC-18: Our organization monitors and secures wireless access.'
          },
          {
            'AC-19 Access Control for Mobile Devices':
              'AC-19: Our organization limits network access of mobile devices such as USB memory, cameras, mobile phones, laptops, tablet PCs, iPads, etc…'
          },
          {
            'AC-20 Use of External Information Systems':
              'AC-20: Our organization has a policy on the use of external information systems. (End users using services provided by 3rd parties, such as Cloud computing, google apps, etc…)'
          },
          {
            'AC-21 Information Sharing':
              'AC-21: Our organization ensures shared information maintains the same level of access control with sharing partners.  (Only applicable if you share information with other organizations.) '
          },
          {
            'AC-22 Publicly Accessible Content':
              'AC-22: Our organization designates individuals authorized to post information onto publicly accessible systems; training for those individuals is provided and periodic reviews of publicly accessibly systems are conducted.'
          }
        ]
      },
      {
        Category: 'Awareness and Training',
        questions: [
          {
            'AT-1 Security Awareness and Training Policy and Procedures':
              'AT-1: Our organization has a written cyber-security (IT) policy or procedures that cover Security Awareness and Training (e.g. training and awareness specific to security, etc…)'
          },
          {
            'AT-2 Security Awareness Training':
              'AT-2: Our organization provides basic security awareness training to all information system users as part of initial training for new users, when required by system changes, and thereafter.'
          },
          {
            'AT-3 Role-Based Security Training':
              'AT-3: Our organization provides role-based security-related training. Specific security training on the systems used like training for system admins on the firewall used.'
          },
          {
            'AT-4 Security Training Records':
              'AT-4: Our organization keeps records of individual user training, especially for security relate training.'
          }
        ]
      },
      {
        Category: 'Audit and Accountability',
        questions: [
          {
            'AU-1 Audit and Accountability Policy and Procedures':
              'AU-1: Our organization has a written cyber-security (IT) policy or procedures that cover Audit and Accountability (e.g. audit/event logging and review, etc…)'
          },
          {
            'AU-2 Audit Events':
              'AU-2: Our organization has determined what events should be logged to the point that after-the-fact investigations of incidents will have sufficient information.'
          },
          {
            'AU-3 Content of Audit Records':
              'AU-3: At a minimum, event logs establish what type of event occurred, date and time, the source, the outcome (success or failure), and the identity of any user associated with the event'
          },
          {
            'AU-4 Audit Storage Capacity':
              'AU-4: Our organization has enough storage space to maintain all audit (event) logs for 6 months or more.'
          },
          {
            'AU-5 Response to Audit Processing Failures':
              'AU-5: Alerts are sent out in the event that the audit (event) logs fail.'
          },
          {
            'AU-6 Audit Review, Analysis, and Reporting':
              'AU-6: Our organization reviews and analyzes audit (event) logs for indications of inappropriate or unusual activity.'
          },
          {
            'AU-7 Audit Reduction and Report Generation':
              'AU-7: Our system has the ability to automatically consolidate and flag audit events based on possible inappropriate or unusual activity.'
          },
          {
            'AU-8 Time Stamps':
              'AU-8: All system clocks are synchronized with other network for audit log correlation.'
          },
          {
            'AU-9 Protection of Audit Information':
              'AU-9: Our organization ensures information systems protect audit information and audit tools from unauthorized access, modification, and deletion.'
          },
          {
            'AU-11 Audit Record Retention ':
              'AU-11: We have an audit (event log) record retention policy.'
          },
          {
            'AU-12 Audit Generation':
              'AU-12: Audit (event) logs turned on for all necessary systems.'
          }
        ]
      },
      {
        Category: 'Security Assessment and Authorization',
        questions: [
          {
            'CA-1 Security Assessment and Authorization Policies and Procedures':
              'CA-1: Our organization has a written cyber-security (IT) policy or procedures that cover Security Assessment and Authorization (e.g. formal security review and approval before a system goes live, etc…)'
          },
          {
            'CA-2 Security Assessments':
              'CA-2: Our organization has procedures to perform independent security assessments and the results reviewed by management prior to system deployment.'
          },
          {
            'CA-3 System Interconnections':
              'CA-3: Our organization assesses risks that may be introduced when information systems are connected to other systems with different security requirements and security controls.'
          },
          {
            'CA-5 Plan of Action and Milestones':
              'CA-5: Our organization documents our remediation efforts (e.g. a to-do list of security and/or assessment finding placed into remediation, may be in a helpdesk ticket system).'
          },
          {
            'CA-6 Security Authorization':
              'CA-6: Our organization assigns a senior-level executive who authorizes systems to be placed into production and officially accept risks related to the continuing operation of that system.'
          },
          {
            'CA-7 Continuous Monitoring':
              'CA-7: Our organization continuously monitors compliance with security policies and procedures.'
          },
          {
            'CA-9 Internal System Connections':
              'CA-9: Our organization documents and manages the risk for all internal network connections. '
          }
        ]
      },
      {
        Category: 'Configuration Management',
        questions: [
          {
            'CM-1 Configuration Management Policy and Procedures':
              'CM-1: Our organization has a written cyber-security (IT) policy or procedures that cover Configuration Management (e.g. gold standard, system images, group policies, etc…)'
          },
          {
            'CM-2 Baseline Configuration':
              'CM-2: Our organization has current baseline configuration for systems such as workstations. (e.g. one way is to have a set of standard install images another is to have checklists for installs)'
          },
          {
            'CM-3 Configuration Change Control':
              'CM-3: Our organization controls changes to system baselines (e.g. changes approved, tested and documented).'
          },
          {
            'CM-4 Security Impact Analysis':
              'CM-4: Our organization determines the security impact of proposed changes before they are made.'
          },
          {
            'CM-5 Access Restrictions for Change':
              'CM-5: Our organization restricts who can make changes to the baselines or images.'
          },
          {
            'CM-6 Configuration Settings':
              'CM-6: Our organization identifies, documents, and approves exceptions from the mandatory configuration settings.'
          },
          {
            'CM-7 Least Functionality':
              'CM-7: Our organization configures the information systems to provide only essential capabilities and restricts the use of unnecessary functions, ports, protocols, and/or services.'
          },
          {
            'CM-8 Information System Component Inventory':
              'CM-8: Our organization maintains an up-to-date inventory of information systems (e.g. annual physical count, the use of automated tools etc…).'
          },
          {
            'CM-9 Configuration Management Plan':
              'CM-9: Our organization manages what items are configurable, what settings should be and who is responsible for maintaining the configurations throughout the system life-cycle.'
          },
          {
            'CM-10 Software Usage Restrictions':
              'CM-10: Our organization enforces copyright and licensing requirements. '
          },
          {
            'CM-11 User-Installed Software':
              'CM-11: Our organization establishes, enforces, and monitors what users can install on systems. '
          }
        ]
      },
      {
        Category: 'Contingency Planning',
        questions: [
          {
            'CP-1 Contingency Planning Policy and Procedures':
              'CP-1: Our organization has a written cyber-security (IT) policy or procedures that cover Contingency Planning (e.g. disaster recovery for IT, training, etc…)'
          },
          {
            'CP-2 Contingency Plan':
              'CP-2: Our organization has a business continuity plan that covers essential missions and business functions, recovery objectives, priorities, roles and responsibilities and is the plan reviewed periodically.'
          },
          {
            'CP-3 Contingency Training':
              'CP-3: Our organization trains personnel in their roles and responsibilities with respect to IT business continuity and disaster recovery and provides refresher training regularly.'
          },
          {
            'CP-4 Contingency Plan Testing':
              'CP-4: Our organization tests and conduct exercises of the contingency plan for the information system to determine the plan’s effectiveness and the organization’s readiness to execute the plan.'
          },
          {
            'CP-6 Alternate Storage Site':
              'CP-6: 1.) Our organization has an alternate storage site for backups including agreements to protect backups and access to backups as needed.  2.) Our organization’s alternative storage site for backups is far enough away from our data center as to not be'
          },
          {
            'CP-7 Alternate Processing Site':
              'CP-7: 1.) Our organization has an alternate processing site for our critical systems including everything in order to resume operations for essential missions and business functions. 2.) Our organization has determined the maximum amount of downtime our or'
          },
          {
            'CP-8 Telecommunications Services':
              'CP-8: Our organization establishes alternate telecommunications services including necessary agreements to permit the resumption of information system operations for essential missions and business functions within an acceptable time frame.'
          },
          {
            'CP-9 Information System Backup':
              'CP-9: 1.) Our backups contain all the information necessary to recover the critical systems and data. 2.) Our backups are protected during storage and transportation. 3.) Our organization tests backups regularly to ensure they can be recovered.'
          },
          {
            'CP-10 Information System Recovery and Reconstitution':
              'CP-10: Our organization provides for the recovery and reconstitution of the information system to a known state after a disruption, compromise, or failure.  (This includes transaction recovery for systems that are transaction-based.)'
          }
        ]
      },
      {
        Category: 'Identification and Authentication',
        questions: [
          {
            'IA-1 Identification and Authentication Policy and Procedures':
              'IA-1: Our organization has a written cyber-security (IT) policy or procedures that cover Identification and Authentication (e.g. passwords, etc…)'
          },
          {
            'IA-2 Identification and Authentication (Organizational Users)':
              'IA-2: 1.) Our organization requires users to use unique log-on accounts (e.g.no shared accounts even for root and administrator). 2.) Our organization use multi-factor authentication (Biometrics, Smart Card, Token etc…).'
          },
          {
            'IA-3 Device Identification and Authentication':
              'IA-3: Our information system uniquely identifies and authenticates systems before establishing a connection. (If you use Active Directory this is handled by the workstation authentication process.)'
          },
          {
            'IA-4 Identifier Management':
              'IA-4: Our organization periodically reviews and disables the user accounts after an organization-defined time period of inactivity.'
          },
          {
            'IA-5 Authenticator Management':
              'IA-5: Our organization requires the use of complex passwords, passwords to change regularly and users not to use their previous password for the NOS (Network Operating System e.g. Active Directory).'
          },
          {
            'IA-6 Authenticator Feedback':
              'IA-6: Our information system obscures feedback of authentication information during the authentication process to protect the information from possible exploitation/use by unauthorized individuals. (Displaying asterisks when a user types in a password.)'
          },
          {
            'IA-7 Cryptographic Module Authentication':
              'IA-7: The information systems encrypt the passwords as they are transferred over the network (Passwords are not sent in plain text).'
          },
          {
            'IA-8 Identification and Authentication (Non-Organizational Users)':
              'IA-8: Contractors and third party service accounts require user accounts and passwords.'
          }
        ]
      },
      {
        Category: 'Incident Response',
        questions: [
          {
            'IR-1 Incident Response Policy and Procedures':
              'IR-1: Our organization has a written cyber-security (IT) policy or procedures that cover Incident Response (e.g. how to respond to incident, escalation, reporting, training, etc…)'
          },
          {
            'IR-2 Incident Response Training':
              'IR-2: Our organization trains personnel in their incident response roles and responsibilities with respect to the information system and provides refresher training (End users to report and system admins to respond).'
          },
          {
            'IR-3 Incident Response Testing':
              'IR-3: Our organization conducts exercises to test the incident response capability to determine the incident response effectiveness and documents the results.'
          },
          {
            'IR-4 Incident Handling':
              'IR-4: Our organization employs automated mechanisms to support the incident handling process (e.g. IDS or IPS).'
          },
          {
            'IR-5 Incident Monitoring':
              'IR-5: Our organization tracks and documents information system security incidents.'
          },
          {
            'IR-6 Incident Reporting':
              'IR-6: Our organization employs automated mechanisms to assist in the reporting of security incidents (e.g. help desk ticketing system used for tracking incidents).'
          },
          {
            'IR-7 Incident Response Assistance':
              'IR-7: Our organization provides an incident response support resource that offers advice and assistance to users of the information system for the handling and reporting of security incidents. (Typically part of Helpdesk.)'
          },
          {
            'IR-8 Incident Response Plan':
              'IR-8: Our organization has incident response procedures to define incidents, the general approach for response, what incidents are to be tracked and reported and what documentation is required.'
          }
        ]
      },
      {
        Category: 'Maintenance',
        questions: [
          {
            'MA-1 System Maintenance Policy and Procedures':
              'MA-1: Our organization has a written cyber-security (IT) policy or procedures that cover System Maintenance (e.g. normal routine maintenance)'
          },
          {
            'MA-2 Controlled Maintenance':
              'MA-2: Our organization’s IT maintenance records include 1. date and time; 2. who performing the maintenance; 3. description of the maintenance performed; and a list of equipment removed or replaced.'
          },
          {
            'MA-3 Maintenance Tools':
              'MA-3: Our organization approves, controls, monitors the use of, and maintains on an ongoing basis, information system maintenance tools.'
          },
          {
            'MA-4 Nonlocal Maintenance':
              'MA-4: Our organization checks all media containing diagnostic and test programs for malicious code before the media are used in the information system.'
          },
          {
            'MA-5 Maintenance Personnel':
              'MA-5: Our organization has a process for 3rd party maintenance personnel including authorization and a current list of authorized maintenance organizations and 3rd party personnel are monitored as appropriate.'
          },
          {
            'MA-6 Timely Maintenance':
              'MA-6: Our organization has spare parts on hand for critical information system components. (e.g. spare hard drives etc…)'
          }
        ]
      },
      {
        Category: 'Media Protection',
        questions: [
          {
            'MP-1 Media Protection Policy and Procedures':
              'MP-1: Our organization has a written cyber-security (IT) policy or procedures that cover Media Protection (e.g. protection for removable media, CD, USB flash drives etc…)'
          },
          {
            'MP-2 Media Access':
              'MP-2: Our organization employs automated mechanisms to restrict access to media storage areas and to audit access attempts and access granted (locations storing original installation media, backups, archives, etc…).'
          },
          {
            'MP-3 Media Marking':
              'MP-3: Our organization marks media (backup tapes, DVD, etc…) containing confidential data with a confidential label.'
          },
          {
            'MP-4 Media Storage':
              'MP-4: Our organization physically controls and securely stores system media until the media is destroyed or sanitized using approved equipment, techniques, and procedures.'
          },
          {
            'MP-5 Media Transport':
              'MP-5: 1.) Our organization documents procedures associated with the transport of media outside of controlled areas. 2.) Our organization encrypts data stored on digital media during transport outside of controlled areas.'
          },
          {
            'MP-6 Media Sanitation':
              'MP-6: Our organization sanitizes media prior to disposal, release out of organizational control, or release for reuse. (Formatting hard drives is not adequate for drives that contained confidential data.)'
          },
          {
            'MP-7 Media Use':
              'MP-7 Our organization has determined what types of media can be used on what systems and the required safeguards for media use.'
          }
        ]
      },
      {
        Category: 'Physical and Environmental Protection',
        questions: [
          {
            'PE-1 Physical and Environmental Protection Policy and Procedures':
              'PE-1: Our organization has a written cyber-security (IT) policy or procedures that cover Physical and Environmental Protection (e.g. physical security, backup power, AC, fire protection etc…)'
          },
          {
            'PE-2 Physical Access Authorizations':
              'PE-2: Our organization develops and keeps current a list of personnel with authorized access to the facility, issues physical access authorization credentials; and reviews and approves the access list, periodically reviews the list for expired access.'
          },
          {
            'PE-3 Physical Access Control':
              'PE-3: Our organization 1.) controls access to restricted areas with locks, key card access controls, combination locks etc… 2.) secures keys, combinations, and other physical access devices. 3.) changes combinations and keys regularly 4.) escorts visitors when needed.'
          },
          {
            'PE-4 Access Control for Transmission Medium':
              'PE-4: Our organization controls physical access to information system distribution and transmission lines within organizational facilities. (E.g. Network cables and wire closets)'
          },
          {
            'PE-5 Access Control for Output Devices':
              'PE-5: Our organization controls physical access to information system output devices to prevent unauthorized individuals from obtaining the output. (E.g. printers that print checks, HR data, etc…)'
          },
          {
            'PE-6 Monitoring Physical Access':
              'PE-6: Our organization monitors real-time physical intrusion alarms and surveillance equipment (E.g. Alarms and CCTV covering restricted areas).'
          },
          {
            'PE-8 Visitor Access Records':
              'PE-8: Our organization maintains visitor access records to the facility for the data center and reviews visitor access records at least annually.'
          },
          {
            'PE-9 Power Equipment and Cabling':
              'PE-9: Our organization protects power equipment and power cabling for the information system from damage and destruction (Physical security of electrical utilities).'
          },
          {
            'PE-10 Emergency Shutoff':
              'PE-10: Our organization has an emergency shut off switch in the server room or the capability of shutting off power to systems in emergency situations.'
          },
          {
            'PE-11 Emergency Power':
              'PE-11: Our organization provides a short-term uninterruptible power supply to facilitate an orderly shutdown of systems in the event of a primary power source loss (E.g. UPS or power generator).'
          },
          {
            'PE-12 Emergency Lighting':
              'PE-12: Our organization has working automatic emergency lighting for the server room that activates in the event of a power outage or disruption.'
          },
          {
            'PE-13 Fire Protection':
              'PE-13: Our organization has fire detection for the server room that activates automatically and notifies emergency responders in the event of a fire and has automatic fire suppression in the server room. (Hand held fire extinguishers are not adequate).'
          },
          {
            'PE-14 Temperature and Humidity Controls':
              'PE-14: Our organization maintains temperature and humidity levels in the server room and monitors temperature and humidity levels.'
          },
          {
            'PE-15 Water Damage Protection':
              'PE-15: Our organization protects the information system from damage resulting from water leakage by providing master shutoff valves that are accessible, working properly, and known to key personnel.'
          },
          {
            'PE-16 Delivery and Removal':
              'PE-16: Our organization authorizes, monitors, and controls computer equipment and components entering and exiting the facility and maintains records of those items.'
          },
          {
            'PE-17 Alternate Work Site':
              'PE-17: Our organization employs physical security mechanisms to offsite or alternative processing sites that are commensurate with physical security measures at our main data processing facility.'
          }
        ]
      },
      {
        Category: 'Planning',
        questions: [
          {
            'PL-1 Security Planning Policy and Procedures':
              'PL-1: Our organization has a written cyber-security (IT) policy or procedures that cover Security Planning (e.g. security as part of the full system life cycle)'
          },
          {
            'PL-2 System Security Plan':
              'PL-2: Our organization documents in a system security plan, purpose, requirements, and controls in place for our system and updates our system security plan to address changes to the information system.'
          },
          {
            'PL-4 Rules of Behavior':
              'PL-4: Our organization has rules that describe their responsibilities and expected behavior with regard to information and information system usage (E.g. terms of use or system rules of behavior), and users sign an acknowledgement.'
          },
          {
            'PL-8 Information Security Architecture':
              'PL-8: Our organization has security architecture philosophy for protecting the confidentiality, integrity, and availability of the information systems. '
          }
        ]
      },
      {
        Category: 'Personnel Security',
        questions: [
          {
            'PS-1 Personnel Security Policy and Procedures':
              'PS-1: Our organization has a written cyber-security (IT) policy or procedures that cover Personnel Security (e.g. background checks, disciplinary actions, etc…)'
          },
          {
            'PS-2 Position Risk Designation':
              'PS-2: Our organization assigns a risk designation to all positions, establishes screening criteria for individuals filling those positions; and reviews and revises position risk designations as needed.'
          },
          {
            'PS-3 Personnel Screening':
              'PS-3: Our organization screens individuals prior to authorizing access to the information system, rescreens individuals requiring rescreening as needed.'
          },
          {
            'PS-4 Personnel Termination':
              'PS-4: Upon termination of an individual we terminate system access, conduct exit interviews, retrieve all property, and retain access to organizational data and systems.'
          },
          {
            'PS-5 Personnel Transfer':
              'PS-5: Our organization reviews logical and physical access authorizations to information systems/facilities when personnel are reassigned or transferred to other positions.'
          },
          {
            'PS-6 Access Agreements':
              'PS-6: Our organization has access agreements, such as nondisclosure agreements, rule of behavior, and conflict-of-interest agreements. '
          },
          {
            'PS-7 Third-Party Personnel Security':
              'PS-7: Our organization requires third party contractors to meet the same security background screening and system terms of use as employees.'
          },
          {
            'PS-8 Personnel Sanctions':
              'PS-8: Our organization employs a formal sanctions process for personnel failing to comply with established information security policies and procedures.'
          }
        ]
      },
      {
        Category: 'Risk Assessment',
        questions: [
          {
            'RA-1 Risk Assessment Policy and Procedures':
              'RA-1: Our organization has a written cyber-security (IT) policy or procedures that cover Risk Assessment (e.g. IT risk management)'
          },
          {
            'RA-2 Security Categorization':
              'RA-2: Our organization has a method of categorizing information and the information systems and ensures the categorization is reviewed and approved by executive management.  (Public v. Confidential)'
          },
          {
            'RA-3 Risk Assessment':
              'RA-3: Our organization 1. ) conducts an assessment of risk, including the likelihood & magnitude, from the unauthorized access, use, disclosure, disruption, modification, or destruction 2.) documents results 3.) updates it at least annually.'
          },
          {
            'RA-5 Vulnerability Scanning':
              'RA-5: Our organization employs vulnerability scanning tools that include the capability to readily update the list of information system vulnerabilities scanned.'
          }
        ]
      },
      {
        Category: 'Systems and Services Acquisition',
        questions: [
          {
            'SA-1 System and Services Acquisition Policy and Procedures':
              'SA-1: Our organization has a written cyber-security (IT) policy or procedures that cover System and Services Acquisition (e.g. procurement procedures etc…)'
          },
          {
            'SA-2 Allocation of Resources':
              'SA-2: Our organization includes a systems security as part of the budgeting process.'
          },
          {
            'SA-3 System Development Life Cycle':
              'SA-3: Our organization 1.) manages the information system using a system development life cycle (SDLC) methodology that includes security considerations 2.) defines and documents information system security roles and responsibilities.'
          },
          {
            'SA-4 Acquisition Process':
              'SA-4: When purchasing software or services our organization outlines security requirements in RFPs and security features and considerations are part of the decision process.'
          },
          {
            'SA-5 Information System Documentation':
              'SA-5: For custom developed systems we obtain and protect developer documentation that describes the functional properties of the security controls employed within the system.'
          },
          {
            'SA-8 Security Engineering Principles':
              'SA-8: Our organization applies information system security engineering principles in the specification, design, development, implementation, and modification of the information system.'
          },
          {
            'SA-9 External Information System Services':
              'SA-9: Our organization requires that providers of external information system services comply with our information security requirements and monitors security control compliance.'
          },
          {
            'SA-10 Developer Configuration Management':
              'SA-10: Our organization requires that developers/integrators manage and control changes to systems and only implement organization-approved changes.'
          },
          {
            'SA-11 Developer Security Testing and Evaluation':
              'SA-11: Our organization requires that developers/integrators test systems and changes to the system for vulnerabilities and flaws prior to deployment in the live environment.'
          }
        ]
      },
      {
        Category: 'System and Communications Protection',
        questions: [
          {
            'SC-1 System and Communications Protection Policy and Procedures':
              'SC-1: Our organization has a written cyber-security (IT) policy or procedures that cover System and Communications Protection (e.g. network security, firewalls etc…)'
          },
          {
            'SC-2 Application Partitioning':
              'SC-2: Our critical systems separate user functionality (including user interface services) from information system management functionality.  (System utilities are not accessible by end users etc..)'
          },
          {
            'SC-4 Information in Shared Resources':
              'SC-4: 1.) Our critical systems are on dedicated servers and databases and do not share resource with other systems. 2.) Our critical systems prevent unauthorized and unintended data transfer via shared resources.'
          },
          {
            'SC-5 Denial of Service Protection':
              'SC-5: Our information system protects against or limits the effects of denial of service attacks.  (Typically part of TCP/IP stack on servers and/or network boundary protections such as a firewall.)'
          },
          {
            'SC-7 Boundary Protection':
              'SC-7: Our organization deploys a firewall and limits incoming and outgoing traffic to only the needed ports and protocols and destinations and manages boundary protection with devices, such as, proxies, gateways, routers, firewalls, guards, or VPNs.'
          },
          {
            'SC-8 Transmission Confidentiality and Integrity':
              'SC-8: Our information system protects the integrity of transmitted information.  (VPN or SSL for external connections, regular TCP/IP for internal is fine.)'
          },
          {
            'SC-10 Network Disconnect':
              'SC-10: Critical systems terminate the network connections associated with a communications session at the end of the session or after a time period of inactivity.'
          },
          {
            'SC-12 Cryptographic Key Establishment and Management':
              'SC-12: Our organization establishes and manages cryptographic keys for required cryptography employed within the information system (deployment, physical security and backup of keys).'
          },
          {
            'SC-13 Cryptographic Protection':
              'SC-13: Our information system implements required cryptographic protections using cryptographic modules that comply with organizational policy, contractual requirements, federal laws, regulations, and/or standards.  (Like PCI standards.)'
          },
          {
            'SC-15 Collaborative Computing Devices':
              'SC-15: Our system prohibits remote activation of collaborative computing services except those permitted by our organization (E.g. cloud computing and 3rd party data services).'
          },
          {
            'SC-17 Public Key Infrastructure Certificates':
              'SC-17: Our organization authorizes, monitors, and controls the use of Public Key Infrastructure (PKI) within our systems.'
          },
          {
            'SC-18 Mobile Code':
              'SC-18: Our organization defines acceptable and unacceptable mobile code and authorizes, monitors, and controls the use of mobile code within our systems (E.g. ActiveX, Java, Flash, etc…).'
          },
          {
            'SC-19 Voice Over Internet Protocol':
              'SC-19: Our organization authorizes, monitors, and controls the use of Voice over Internet Protocol (VoIP) within our systems.'
          },
          {
            'SC-20 Secure Name/Address Resolution Service (Authoritative Source)':
              'SC-20: Our DNS zones and all the records in the zones are cryptographically signed. (DNSSEC)'
          },
          {
            'SC-21 Secure Name/Address Resolution Service (Recursive or Caching Resolver)':
              'SC-21: Our client systems validate DNS records. (DNSSEC) '
          },
          {
            'SC-22 Architecture and Provisioning for Name/Address Resolution Service':
              'SC-22: Our information systems that collectively provide name/address resolution service for an organization are fault-tolerant and implement internal/external role separation. (Having more than one DNS server available to service requests.)'
          },
          {
            'SC-23 Session Authenticity':
              'SC-23: Our information system provides mechanisms to protect the authenticity of communications sessions.  This control is only implemented where deemed necessary by the organization.  (E.g. you might use SSL for website traffic.)'
          },
          {
            'SC-28 Protection of Information at Rest':
              'SC-28: Our system protects the confidentiality and integrity of information at rest (E.g. using access control lists on network shares and/or encryption etc…).'
          },
          {
            'SC-39 Process Isolation':
              'SC-39:  Our information system maintains a separate execution domain for each executing process.  (This capability is available in most commercial operating systems that employ multi-state processor technologies.)'
          }
        ]
      },
      {
        Category: 'System and Information Integrity',
        questions: [
          {
            'SI-1 System and Information Integrity Policy and Procedures':
              'SI-1: Our organization has a written cyber-security (IT) policy or procedures that cover System and Information Integrity (e.g. malware prevention, spam prevention etc…)'
          },
          {
            'SI-2 Flaw Remediation':
              'SI-2: Our organization has a patch management process to remediate flaws and vulnerabilities on all key systems (E.g. automatic for workstations and manual updates for servers within 30 days of patch availability).'
          },
          {
            'SI-3 Malicious Code Protection':
              'SI-3: Our organization centrally manages malicious code protection mechanisms (anti-virus, anti-spyware, etc…) with automatic updates and prevents end users from circumventing protection.'
          },
          {
            'SI-4 Information System Monitoring':
              'SI-4: Our organization employs automated tools to support near real-time analysis of events. For example, IPS, IDS, Security Information and Event Management (SIEM), etc…'
          },
          {
            'SI-5 Security Alerts, Advisories, Directives':
              'SI-5: Our organization monitors security alerts, advisories, and directives from designated external organizations on an ongoing basis.'
          },
          {
            'SI-7 Software, Firmware, and Information Integrity':
              'SI-7: Our organization reassesses the integrity of software and information by performing periodic integrity scans of the system (E.g. testing inputs against outputs on critical systems).'
          },
          {
            'SI-8 Spam Protection':
              'SI-8: Our organization employs spam protection mechanisms.'
          },
          {
            'SI-10 Information Input Validation':
              'SI-10: Critical systems check the validity of information inputs. (E.g. only numbers can be put in number fields, only zip codes can be put in zip code fields, etc…).'
          },
          {
            'SI-11 Error Handling':
              'SI-11: Critical systems identify potentially security-relevant error conditions; generates error messages that provide information necessary for corrective actions (alerts, audit or event logs).'
          },
          {
            'SI-12 Information Handling and Retention':
              'SI-12: Our organization handles and retains both information within and output from the information system in accordance with applicable state & federal laws, directives, policies, regulations, standards, and operational requirements.'
          }
        ]
      },
      {
        Category: 'Program Management',
        questions: [
          {
            'PM-1 Information Security Program Plan':
              'PM-1: Our organization has a documented security program that has been approved by senior management.'
          },
          {
            'PM-2 Senior Information Security Officer':
              'PM-2: Our organization has a senior information security officer (CISO) to implement and maintain the security program.'
          },
          {
            'PM-3 Information Security Resources':
              'PM-3: Our organization ensures cybersecurity is included in appropriate budget requests.'
          },
          {
            'PM-4 Plan of Action and Milestones Process':
              'PM-4: Our organization has a process to remediate failed security controls and newly discovered vulnerabilities.  This should include: 1) a process to evaluate and budget for needed controls and fixes and 2.) a list of open remediation items is reported to upper management on a regular basis.  '
          },
          {
            'PM-5 Information System Inventory':
              'PM-5: Our organization develops and maintains an inventory of all our information systems.'
          },
          {
            'PM-6 Information Security Measures of Performance':
              'PM-6: Our organization develops, monitors, and reports on the results of information security measures of performance.'
          },
          {
            'PM-7 Enterprise Architecture':
              'PM-7: Our organization develops an enterprise architecture with consideration for information security and the resulting risk to organizational operations, organizational assets, individuals, other organizations, and the Nation.'
          },
          {
            'PM-8 Critical Infrastructure Plan':
              'PM-8: Our organization addresses information security issues in the development, documentation, and updating of a critical infrastructure and key resources protection plan.'
          },
          {
            'PM-9 Risk Management Strategy':
              'PM-9: Our organization has a comprehensive strategy to manage risk to organizational operations and assets, individuals, other organizations, and the Nation. '
          },
          {
            'PM-10 Security Authorization Process':
              'PM-10: Our organization has a process for management to officially sign-off on the security of systems before they go live.'
          },
          {
            'PM-11 Mission/Business Process Definition':
              'PM-11: Our organization documents for each system the supporting mission/business processes and the associated risks. '
          },
          {
            'PM-12 Insider Threat Program':
              'PM-12: Our organization implements an insider threat program that includes a cross-discipline insider threat incident handling team.'
          },
          {
            'PM-13 Information Security Workforce':
              'PM-13: Our organization establishes an information security workforce development and improvement program.'
          },
          {
            'PM-14 Testing, Training and Monitoring':
              'PM-14: Our organization has a process for security testing, training, an monitoring.'
          },
          {
            'PM-15 Contacts with Security Groups and Associations':
              'PM-15: Our organization encourages contact and involvement with security groups and associations.'
          },
          {
            'PM-16 Threat Awareness Program':
              'PM-16: Our organization implements a threat awareness program that includes a cross-organization information-sharing capability.'
          }
        ]
      }
    ]
  },
  {
    SurveyName: 'Credit Card Processing PCI Questionnaire',
    Questions: [
      {
        Category: 'Credit Card Processing PCI Questionnaire',
        questions: [
          {
            '1 Does your organization accept credit cards for payments in any form?':
              'If you answer "Yes" to the first question please continue.  If you answered "No" you are done with this questionnaire.'
          },
          {
            '2 Please select the statements that best describe how your organization accepts credit cards:':
              'a. Paper (old style manual carbon copy) \n b. POS terminals (point of sale devices connected directly to phone lines) \n c. Computer based terminal (built into computers or connected to network) \n d. Over the phone (we take card numbers over the phone) \n e. Outsourced ecommerce (we take credit card payments online using a 3rd party) \n f. In house ecommerce (we take credit card payments online using a web application hosted on our systems)'
          },
          {
            '3 ':
              'Does your merchant bank require your organization to complete the annual PCI SAQ (Self-Assessment Questionnaire)?'
          },
          {
            '4 ':
              'Does your merchant bank require your organization to complete quarterly PCI network vulnerability scans?'
          },
          {
            '5 ':
              'Is your organization PCI-DSS compliant?  (Payment Card Industry Data Security Standard)'
          }
        ]
      }
    ]
  },
  {
    SurveyName: 'Demographics',
    Questions: [
      'Names of individuals completing this questionnaire. (List anyone who help complete this questionnaire.)',
      '-Network-',
      'What is the total number of IT staff?',
      'What is the total number of servers supported by IT staff?',
      'What is the total number of workstations supported by IT staff?',
      'What is the total number of remote locations supported by IT staff?',
      'What is your organizations primary Network Operating System (NOS)? (i.e. Active Directory, Novell Directory Services, Kerberos realm, workgroup, etc.).',
      '-Financial System-',
      'What are the names of the financial applications (ERP) used in your organization? (Include GL, AP, AR, ecommerce, utility billing, permits, other payments and other).',
      'Describe any integration your general ledger application may have with other systems.  (Example: automated GL posting, Manual GL posting, Batch process GL posting).',
      'Are any of the financial applications hosted by a 3rd party?  (If so, which ones and by whom?)',
      'Are any of the financial applications managed by a 3rd party? (If so, which ones and by whom?)',
      'What is the total number of finance staff?',
      'What is the total number of users with more than read only access to the ERP (finance applications)?',
      'What is the total number of IT staff with administrative access to the ERP (financial applications)?',
      'What is the total number of servers supporting financial functions? (e. g. mainframes, ERP servers, DB servers, file servers etc.…)',
      'What is the total number of workstations supporting financial functions? (e. g. workstations in finance department that connect to the financial application).',
      'What is the total number of remote locations with financial data?  (Do not include locations with only workstations.  Include locations with servers that have financial data.)',
      'Have access controls to any of the financial applications been modified? (Code changes made to the financial application)'
    ]
  }
];

server.get('/api/surveys/all', (req, res) => {
  res.send(Surveys);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
