import React from 'react';
import html2canvas from 'html2canvas';
import './ExportButton.css';

const ExportButton = ({ tableRef, disabled = false }) => {
  const handleExport = async () => {
    if (!tableRef.current) {
      console.error('Referência da tabela não encontrada');
      return;
    }

    try {
      // Mostrar indicador de carregamento
      const button = document.querySelector('.export-button');
      if (button) {
        button.classList.add('exporting');
        button.disabled = true;
      }

      // Mostrar título de exportação
      const exportTitle = tableRef.current.querySelector('.export-title');
      if (exportTitle) {
        exportTitle.style.display = 'block';
      }

      // Pequeno delay para garantir que o título seja renderizado
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturar a tabela como canvas
      const canvas = await html2canvas(tableRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Aumentar qualidade da imagem
        logging: false,
        useCORS: true, // Permitir imagens de outras origens
        allowTaint: true
      });

      // Ocultar título de exportação novamente
      if (exportTitle) {
        exportTitle.style.display = 'none';
      }

      // Converter para JPEG e fazer download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        link.download = `pokemon-team-${timestamp}.jpeg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);

        // Remover indicador de carregamento
        if (button) {
          button.classList.remove('exporting');
          button.disabled = false;
        }
      }, 'image/jpeg', 0.95); // Qualidade JPEG 95%

    } catch (error) {
      console.error('Erro ao exportar imagem:', error);
      alert('Erro ao exportar imagem. Tente novamente.');
      
      // Ocultar título em caso de erro
      const exportTitle = tableRef.current?.querySelector('.export-title');
      if (exportTitle) {
        exportTitle.style.display = 'none';
      }
      
      // Remover indicador de carregamento em caso de erro
      const button = document.querySelector('.export-button');
      if (button) {
        button.classList.remove('exporting');
        button.disabled = false;
      }
    }
  };

  return (
    <button 
      className="export-button" 
      onClick={handleExport}
      disabled={disabled}
      title="Exportar seleções como imagem JPEG"
    >
      <span className="export-icon">📸</span>
      <span className="export-text">Exportar como Imagem</span>
      <span className="export-loading">
        <span className="spinner"></span>
        Gerando...
      </span>
    </button>
  );
};

export default ExportButton;
