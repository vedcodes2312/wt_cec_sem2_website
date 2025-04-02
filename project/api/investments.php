<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated']);
    exit;
}

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'create':
        $type = $_POST['type'] ?? '';
        $amount = $_POST['amount'] ?? 0;
        $userId = $_SESSION['user_id'];
        
        if (empty($type) || $amount <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid investment details']);
            exit;
        }
        
        $conn = getConnection();
        $stmt = $conn->prepare("INSERT INTO investments (user_id, type, amount, status) VALUES (?, ?, ?, 'Active')");
        $stmt->bind_param("isd", $userId, $type, $amount);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Investment successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Investment failed']);
        }
        
        $stmt->close();
        $conn->close();
        break;
        
    case 'list':
        $userId = $_SESSION['user_id'];
        $conn = getConnection();
        
        $result = $conn->query("SELECT * FROM investments WHERE user_id = $userId ORDER BY created_at DESC");
        $investments = [];
        
        while ($row = $result->fetch_assoc()) {
            $investments[] = $row;
        }
        
        echo json_encode(['success' => true, 'data' => $investments]);
        
        $conn->close();
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>