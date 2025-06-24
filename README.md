# Blockchain-Based Construction Project Management System

A comprehensive smart contract system built on the Stacks blockchain using Clarity for managing construction projects with transparency, accountability, and automated compliance.

## 🏗️ System Overview

This system provides a complete blockchain-based solution for construction project management, featuring five interconnected smart contracts that handle different aspects of construction project lifecycle:

### Core Components

1. **Project Manager Verification** - Validates and manages construction project managers
2. **Timeline Coordination** - Coordinates project timelines and milestones
3. **Resource Allocation** - Manages construction resources and allocation
4. **Quality Assurance** - Ensures construction quality through inspections
5. **Safety Compliance** - Manages safety standards and incident reporting

## 🚀 Features

### Project Manager Verification
- ✅ License validation and verification
- ✅ Experience tracking and specialization management
- ✅ Active status management
- ✅ Project count tracking

### Timeline Coordination
- ✅ Project creation and timeline management
- ✅ Milestone tracking with dependencies
- ✅ Progress monitoring and completion tracking
- ✅ Status updates and notifications

### Resource Allocation
- ✅ Resource inventory management
- ✅ Allocation tracking and availability
- ✅ Cost management per resource
- ✅ Resource release and reallocation

### Quality Assurance
- ✅ Quality standards definition
- ✅ Inspection scheduling and execution
- ✅ Scoring system with pass/fail criteria
- ✅ Corrective action tracking

### Safety Compliance
- ✅ Incident reporting and tracking
- ✅ Safety training record management
- ✅ Severity classification system
- ✅ Safety statistics and scoring

## 📋 Contract Functions

### Project Manager Verification Contract

#### Public Functions
- \`verify-manager\` - Verify a new project manager
- \`deactivate-manager\` - Deactivate a manager's status

#### Read-Only Functions
- \`is-verified-manager\` - Check if a manager is verified
- \`get-manager-info\` - Get manager details
- \`get-manager-projects\` - Get manager's project statistics

### Timeline Coordination Contract

#### Public Functions
- \`create-project\` - Create a new construction project
- \`add-milestone\` - Add milestone to a project
- \`complete-milestone\` - Mark milestone as completed

#### Read-Only Functions
- \`get-project\` - Get project details
- \`get-milestone\` - Get milestone information

### Resource Allocation Contract

#### Public Functions
- \`add-resource\` - Add new resource to inventory
- \`allocate-resource\` - Allocate resource to project
- \`release-resource\` - Release resource from project

#### Read-Only Functions
- \`get-resource\` - Get resource details
- \`get-allocation\` - Get allocation information
- \`get-resource-availability\` - Check resource availability

### Quality Assurance Contract

#### Public Functions
- \`set-quality-standard\` - Define quality standards
- \`conduct-inspection\` - Perform quality inspection
- \`add-corrective-actions\` - Add corrective actions to failed inspections

#### Read-Only Functions
- \`get-inspection\` - Get inspection details
- \`get-quality-standard\` - Get quality standard information
- \`get-project-quality-summary\` - Get project quality overview

### Safety Compliance Contract

#### Public Functions
- \`report-incident\` - Report safety incident
- \`resolve-incident\` - Resolve reported incident
- \`record-safety-training\` - Record worker safety training

#### Read-Only Functions
- \`get-incident\` - Get incident details
- \`get-training-record\` - Get training record
- \`get-project-safety-stats\` - Get project safety statistics
- \`is-worker-certified\` - Check worker certification status

## 🔧 Installation & Deployment

### Prerequisites
- Stacks CLI
- Clarinet (for local development)
- Node.js (for testing)

### Local Development
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd construction-blockchain-system

# Install dependencies
npm install

# Run tests
npm test

# Deploy to local testnet
clarinet deploy --testnet
\`\`\`

### Deployment to Mainnet
\`\`\`bash
# Deploy to Stacks mainnet
stx deploy_contract project-manager-verification contracts/project-manager-verification.clar
stx deploy_contract timeline-coordination contracts/timeline-coordination.clar
stx deploy_contract resource-allocation contracts/resource-allocation.clar
stx deploy_contract quality-assurance contracts/quality-assurance.clar
stx deploy_contract safety-compliance contracts/safety-compliance.clar
\`\`\`

## 🧪 Testing

The system includes comprehensive tests using Vitest:

\`\`\`bash
# Run all tests
npm test

# Run specific test file
npm test -- project-manager-verification.test.js

# Run tests in watch mode
npm test -- --watch
\`\`\`

## 📊 Usage Examples

### Verifying a Project Manager
\`\`\`clarity
(contract-call? .project-manager-verification verify-manager
'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK
"LIC123456"
u10
"Commercial Construction")
\`\`\`

### Creating a Project
\`\`\`clarity
(contract-call? .timeline-coordination create-project
'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK
u1000
u2000)
\`\`\`

### Allocating Resources
\`\`\`clarity
(contract-call? .resource-allocation allocate-resource
u1
u1
u100
'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK)
\`\`\`

## 🔒 Security Considerations

- All contracts implement proper authorization checks
- Input validation prevents invalid data entry
- Resource allocation prevents over-allocation
- Manager verification ensures only qualified personnel
- Incident reporting maintains audit trail

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🔄 Roadmap

- [ ] Integration with IoT sensors for real-time monitoring
- [ ] Mobile app for field workers
- [ ] Advanced analytics and reporting
- [ ] Integration with existing construction management tools
- [ ] Multi-language support

