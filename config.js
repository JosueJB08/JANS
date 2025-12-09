/**
 * Configuración de DataTables con exportación a Excel y PDF
 * Carga datos desde el controlador PHP mediante AJAX
 */

$(document).ready(function() {
    
    // Inicializar DataTable
    $('#tablaUsuarios').DataTable({
        
        // Cargar datos desde el controlador PHP
        ajax: {
            url: 'controllers/UsuarioController.php',
            type: 'GET',
            dataSrc: 'data',
            error: function(xhr, error, thrown) {
                console.error('Error al cargar datos:', error);
                alert('Error al cargar los datos. Por favor, verifica la conexión con el servidor.');
            }
        },
        
        // Mapeo de columnas
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'email' },
            { data: 'telefono' },
            { data: 'departamento' },
            { 
                data: 'salario',
                render: function(data) {
                    return '$' + parseFloat(data).toLocaleString('es-MX');
                }
            },
            { 
                data: 'estado',
                render: function(data) {
                    if (data === 'Activo') {
                        return '<span class="status-active">Activo</span>';
                    } else {
                        return '<span class="status-inactive">Inactivo</span>';
                    }
                }
            },
            { 
                data: 'fecha_registro',
                render: function(data) {
                    // Formatear fecha
                    const fecha = new Date(data);
                    return fecha.toLocaleDateString('es-MX');
                }
            }
        ],
        
        // Configuración de botones de exportación
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '📊 Exportar a Excel',
                title: 'Reporte de Usuarios',
                filename: 'reporte_usuarios_' + obtenerFechaActual(),
                className: 'btn-excel',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column, node) {
                            // Limpiar HTML de los badges de estado
                            return $(data).text() || data;
                        }
                    }
                },
                customize: function(xlsx) {
                    // Personalización adicional del Excel si es necesario
                }
            },
            {
                extend: 'pdfHtml5',
                text: '📄 Exportar a PDF',
                title: 'Reporte de Usuarios',
                filename: 'reporte_usuarios_' + obtenerFechaActual(),
                className: 'btn-pdf',
                orientation: 'landscape',
                pageSize: 'A4',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column, node) {
                            // Limpiar HTML de los badges de estado
                            return $(data).text() || data;
                        }
                    }
                },
                customize: function(doc) {
                    // Configuración del documento PDF
                    doc.defaultStyle.fontSize = 9;
                    doc.styles.tableHeader.fontSize = 10;
                    doc.styles.tableHeader.fillColor = '#667eea';
                    doc.styles.tableHeader.color = 'white';
                    doc.styles.tableHeader.alignment = 'center';
                    
                    // Título
                    doc.styles.title = {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                        color: '#667eea',
                        margin: [0, 0, 0, 15]
                    };
                    
                    // Agregar información adicional al inicio
                    doc.content.splice(0, 0, {
                        text: 'Sistema de Gestión de Usuarios',
                        style: 'title'
                    });
                    
                    // Agregar fecha de generación
                    doc.content.splice(1, 0, {
                        text: 'Fecha de generación: ' + new Date().toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        alignment: 'center',
                        fontSize: 10,
                        margin: [0, 0, 0, 10]
                    });
                    
                    // Configurar anchos de columna automáticos
                    doc.content[3].table.widths = 
                        Array(doc.content[3].table.body[0].length).fill('*');
                    
                    // Footer con número de página
                    doc.footer = function(currentPage, pageCount) {
                        return {
                            text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                            alignment: 'center',
                            fontSize: 9,
                            margin: [0, 10, 0, 0]
                        };
                    };
                }
            }
        ],
        
        // Configuración de idioma (español)
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        
        // Configuración de paginación y visualización
        pageLength: 10,
        lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "Todos"]],
        
        // Ordenamiento inicial
        order: [[0, 'asc']],
        
        // Responsive
        responsive: true,
        
        // Tipo de paginación
        pagingType: 'full_numbers',
        
        // Procesando mensaje
        processing: true,
        
        // Configuración adicional
        autoWidth: false,
        
        // Callback después de cargar los datos
        initComplete: function(settings, json) {
            console.log('DataTable inicializado correctamente');
            console.log('Total de registros:', json.data.length);
        },
        
        // Callback al dibujar la tabla
        drawCallback: function(settings) {
            // Puedes agregar funcionalidades adicionales aquí
        }
    });
    
});

/**
 * Función auxiliar para obtener la fecha actual en formato YYYY-MM-DD
 */
function obtenerFechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}

/**
 * Función para recargar los datos de la tabla
 */
function recargarTabla() {
    $('#tablaUsuarios').DataTable().ajax.reload();
}