// Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Download CV Functionality
        document.getElementById('downloadCV').addEventListener('click', function() {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = 'pdf/Abdirahman Ahmed Yusuf Cv2 (1).pdf'; // Update with actual CV path
            link.download = 'Abdirahman Ahmed Yusuf Cv2 (1).pdf'; // Suggested file name
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show download confirmation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> CV Downloaded!';
            this.style.background = '#00b894';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });

        // Contact Form with Local Storage
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create submission object
            const submission = {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            };
            
            // Get existing submissions from localStorage
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            
            // Add new submission
            submissions.push(submission);
            
            // Save back to localStorage
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Update admin panel if open
            if (document.getElementById('adminModal').style.display === 'flex') {
                displaySubmissions();
            }
        });

        // Newsletter Form
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // Get existing newsletter subscriptions from localStorage
            let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
            
            // Add new subscription
            subscriptions.push({
                email,
                timestamp: new Date().toISOString()
            });
            
            // Save back to localStorage
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            
            alert(`Thank you for subscribing with ${email}! You'll receive updates on my latest projects.`);
            this.reset();
        });

        // Admin Panel
        const adminPanel = document.getElementById('adminPanel');
        const adminModal = document.getElementById('adminModal');
        const closeAdmin = document.getElementById('closeAdmin');
        const clearData = document.getElementById('clearData');

        adminPanel.addEventListener('click', () => {
            adminModal.style.display = 'flex';
            displaySubmissions();
        });

        closeAdmin.addEventListener('click', () => {
            adminModal.style.display = 'none';
        });

        clearData.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all contact form submissions?')) {
                localStorage.removeItem('contactSubmissions');
                displaySubmissions();
            }
        });

        // Close modal when clicking outside
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });

        // Function to display submissions in admin panel
        function displaySubmissions() {
            const submissionsContainer = document.getElementById('submissionsContainer');
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            
            if (submissions.length === 0) {
                submissionsContainer.innerHTML = '<p>No submissions yet.</p>';
                return;
            }
            
            let html = `
                <table class="submissions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            submissions.forEach(submission => {
                const date = new Date(submission.timestamp).toLocaleDateString();
                html += `
                    <tr>
                        <td>${date}</td>
                        <td>${submission.name}</td>
                        <td>${submission.email}</td>
                        <td>${submission.subject}</td>
                        <td>${submission.message}</td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
                <p>Total submissions: ${submissions.length}</p>
            `;
            
            submissionsContainer.innerHTML = html;
        }