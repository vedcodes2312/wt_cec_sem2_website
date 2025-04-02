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
            echo json_encode(['success' => false, 'message' => 'Invalid transaction details']);
            exit;
        }
        
        $conn = getConnection();
        $stmt = $conn->prepare("INSERT INTO transactions (user_id, type, amount, status) VALUES (?, ?, ?, 'Success')");
        $stmt->bind_param("isd", $userId, $type, $amount);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Transaction successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Transaction failed']);
        }
        
        $stmt->close();
        $conn->close();
        break;
        
    case 'list':
        $userId = $_SESSION['user_id'];
        $conn = getConnection();
        
        $result = $conn->query("SELECT * FROM transactions WHERE user_id = $userId ORDER BY created_at DESC");
        $transactions = [];
        
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }
        
        echo json_encode(['success' => true, 'data' => $transactions]);
        
        $conn->close();
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>