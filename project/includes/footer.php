<footer class="bg-dark text-light py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5 class="company-name">PayEase India</h5>
                    <p>Making financial services accessible to all</p>
                    <div class="social-icons">
                        <a href="#" class="text-light me-3"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-light me-3"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="text-light me-3"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="text-light"><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
                <div class="col-md-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light"><i class="bi bi-chevron-right"></i> About Us</a></li>
                        <li><a href="#" class="text-light"><i class="bi bi-chevron-right"></i> Contact</a></li>
                        <li><a href="#" class="text-light"><i class="bi bi-chevron-right"></i> Career</a></li>
                        <li><a href="#" class="text-light"><i class="bi bi-chevron-right"></i> Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Contact Us</h5>
                    <p>
                        <i class="bi bi-envelope me-2"></i>
                        <span class="support-email">support@payease.in</span>
                    </p>
                    <p>
                        <i class="bi bi-telephone me-2"></i>
                        <span class="support-phone">1800-123-4567</span>
                    </p>
                    <p>
                        <i class="bi bi-geo-alt me-2"></i>
                        Mumbai, Maharashtra, India
                    </p>
                </div>
            </div>
            <hr class="mt-4">
            <div class="text-center">
                <p class="mb-0">&copy; <?php echo date('Y'); ?> PayEase India. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        $(document).ready(function() {
            // Handle logout
            $('#logoutBtn').click(function(e) {
                e.preventDefault();
                
                $.post('api/auth.php', { action: 'logout' }, function(response) {
                    if (response.success) {
                        window.location.href = 'login.php';
                    }
                });
            });
        });
    </script>
</body>
</html>