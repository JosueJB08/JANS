<?php
/**
 * Controlador de Usuarios
 * Maneja las peticiones relacionadas con la tabla de usuarios
 */

// Configurar cabeceras para JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

// Incluir la configuración de base de datos
require_once '../config/database.php';

class UsuarioController {
    
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Obtener todos los usuarios
     */
    public function obtenerUsuarios() {
        try {
            $query = "SELECT 
                        id,
                        nombre,
                        email,
                        telefono,
                        departamento,
                        salario,
                        estado,
                        fecha_registro
                      FROM usuarios
                      ORDER BY id ASC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Formatear los datos si es necesario
            foreach ($usuarios as &$usuario) {
                // Asegurar que el salario sea numérico
                $usuario['salario'] = number_format($usuario['salario'], 2, '.', '');
            }
            
            return [
                'success' => true,
                'data' => $usuarios,
                'total' => count($usuarios)
            ];
            
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Error al obtener usuarios: ' . $e->getMessage(),
                'data' => []
            ];
        }
    }
    
    /**
     * Obtener usuario por ID
     */
    public function obtenerUsuarioPorId($id) {
        try {
            $query = "SELECT * FROM usuarios WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($usuario) {
                return [
                    'success' => true,
                    'data' => $usuario
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Usuario no encontrado',
                    'data' => null
                ];
            }
            
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Error al obtener usuario: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }
    
    /**
     * Filtrar usuarios por departamento
     */
    public function filtrarPorDepartamento($departamento) {
        try {
            $query = "SELECT * FROM usuarios WHERE departamento = :departamento ORDER BY id ASC";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':departamento', $departamento, PDO::PARAM_STR);
            $stmt->execute();
            
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $usuarios,
                'total' => count($usuarios)
            ];
            
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Error al filtrar usuarios: ' . $e->getMessage(),
                'data' => []
            ];
        }
    }
}

// Crear instancia de la base de datos
$database = new Database();
$db = $database->getConnection();

// Verificar conexión
if ($db === null) {
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo conectar a la base de datos',
        'data' => []
    ]);
    exit;
}

// Crear instancia del controlador
$controller = new UsuarioController($db);

// Manejar diferentes tipos de peticiones
$action = isset($_GET['action']) ? $_GET['action'] : 'obtenerTodos';

switch ($action) {
    case 'obtenerTodos':
        $resultado = $controller->obtenerUsuarios();
        echo json_encode($resultado);
        break;
        
    case 'obtenerPorId':
        if (isset($_GET['id'])) {
            $resultado = $controller->obtenerUsuarioPorId($_GET['id']);
            echo json_encode($resultado);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'ID no proporcionado',
                'data' => null
            ]);
        }
        break;
        
    case 'filtrarPorDepartamento':
        if (isset($_GET['departamento'])) {
            $resultado = $controller->filtrarPorDepartamento($_GET['departamento']);
            echo json_encode($resultado);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Departamento no proporcionado',
                'data' => []
            ]);
        }
        break;
        
    default:
        $resultado = $controller->obtenerUsuarios();
        echo json_encode($resultado);
        break;
}
?>