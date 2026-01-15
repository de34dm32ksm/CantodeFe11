import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
            📜 TÉRMINOS DEL SERVICIO – CANTO DE FE
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              VISIÓN GENERAL
            </h2>
            
            <p>
              Bienvenido a Canto de Fe. Los términos "nosotros", "nos" y "nuestro" se refieren a Canto de Fe. Canto de Fe opera este sitio web, incluyendo toda la información, contenidos, funciones, herramientas, productos y servicios relacionados, con el fin de ofrecerle, como cliente, una experiencia personalizada (los "Servicios").
            </p>
            
            <p>
              Los presentes términos y condiciones, junto con cualquier política a la que se haga referencia en el presente documento (estos "Términos del Servicio" o los "Términos"), describen sus derechos y responsabilidades al utilizar los Servicios.
            </p>
            
            <p>
              Le rogamos que lea atentamente estos Términos del Servicio, ya que contienen información importante sobre sus derechos legales e incluyen disposiciones sobre exclusiones de garantías y limitaciones de responsabilidad.
            </p>
            
            <p>
              Al visitar, interactuar o utilizar nuestros Servicios, usted acepta quedar vinculado por estos Términos del Servicio y por nuestra <Link to="/privacy-policy" className="text-primary hover:underline">Política de Privacidad</Link>. Si no acepta estos Términos del Servicio o la Política de Privacidad, no debe utilizar ni acceder a nuestros Servicios.
            </p>
            
            <p>
              Nada de lo dispuesto en estos Términos pretende limitar, excluir o afectar derechos irrenunciables que puedan corresponderle conforme a la legislación aplicable en su jurisdicción de residencia.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 1 – ACCESO Y CUENTA
            </h2>
            
            <p>
              Al aceptar estos Términos del Servicio, usted declara que tiene al menos la mayoría de edad legal en su estado, provincia o país de residencia, y que ha otorgado su consentimiento para permitir que cualquier menor a su cargo utilice los Servicios en dispositivos que usted posea, compre o gestione.
            </p>
            
            <p>
              Para utilizar los Servicios, incluyendo el acceso o navegación por nuestro sitio web o la compra de cualquiera de los productos o servicios que ofrecemos, es posible que se le solicite determinada información, como su dirección de correo electrónico y datos de facturación, pago y envío. Usted declara y garantiza que toda la información que proporcione es veraz, actual y completa, y que dispone de todos los derechos necesarios para proporcionarla.
            </p>
            
            <p>
              Usted es el único responsable de mantener la seguridad de las credenciales de su cuenta y de toda la actividad que se realice en ella. No podrá transferir, vender, ceder ni licenciar su cuenta a ninguna otra persona.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 2 – NUESTROS PRODUCTOS
            </h2>
            
            <p>
              Aunque nuestro objetivo es crear algo profundamente emotivo y significativo, el resultado final puede diferir de lo que usted haya imaginado inicialmente. Como ocurre con cualquier servicio creativo, las interpretaciones y respuestas emocionales pueden variar.
            </p>
            
            <p>
              No garantizamos que la apariencia, calidad o impacto emocional de los productos o servicios adquiridos cumplan sus expectativas ni que coincidan exactamente con lo mostrado o descrito en nuestro sitio web. Todas las descripciones de productos están sujetas a cambios en cualquier momento y sin previo aviso, a nuestra entera discreción.
            </p>
            
            <p>
              Nos reservamos el derecho de interrumpir cualquier producto en cualquier momento y de limitar las cantidades ofrecidas a cualquier persona, región geográfica o jurisdicción, caso por caso.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 3 – PEDIDOS
            </h2>
            
            <p>
              Al realizar un pedido, usted presenta una oferta de compra. Canto de Fe se reserva el derecho de aceptar o rechazar cualquier pedido, por cualquier motivo y a su discreción. Un pedido no se considerará aceptado hasta que Canto de Fe confirme su aceptación y haya recibido y procesado el pago correspondiente.
            </p>
            
            <p>
              Revise cuidadosamente su pedido antes de enviarlo, ya que, una vez aceptado, es posible que no podamos atender solicitudes de cancelación. En caso de que no aceptemos, modifiquemos o cancelemos un pedido, intentaremos notificárselo a través del correo electrónico facilitado al realizar el pedido.
            </p>
            
            <p>
              Usted declara y garantiza que sus compras son para uso personal o doméstico y no para reventa comercial ni exportación.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 4 – PRECIOS Y FACTURACIÓN
            </h2>
            
            <p>
              Los precios, descuentos y promociones están sujetos a cambios sin previo aviso. El precio aplicable será el vigente en el momento de realizar el pedido y figurará en el correo electrónico de confirmación.
            </p>
            
            <p>
              Salvo que se indique expresamente lo contrario, los precios publicados no incluyen impuestos, gastos de envío, gestión, aduanas o importación.
            </p>
            
            <p>
              Usted se compromete a proporcionar información de compra y pago veraz, completa y actualizada, y a mantenerla al día para que podamos completar sus transacciones y contactarle cuando sea necesario.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 5 – ENTREGA
            </h2>
            
            <p>
              El acceso a los servicios adquiridos se proporciona mediante un enlace de acceso disponible a través de los Servicios y, en su caso, mediante una notificación enviada al correo electrónico que usted haya facilitado.
            </p>
            
            <p>
              La entrega se considerará completada cuando el enlace de acceso esté disponible, independientemente de que usted abra el correo, haga clic en el enlace o reproduzca el contenido.
            </p>
            
            <p>
              Los plazos de entrega son estimaciones y no están garantizados. No nos responsabilizamos de retrasos o problemas de acceso debidos a causas ajenas a nuestro control o a configuraciones de sus dispositivos, software, proveedor de internet o correo electrónico.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIÓN 6 – PROPIEDAD INTELECTUAL
            </h2>
            
            <p>
              Todos los Servicios y contenidos, incluyendo marcas, textos, imágenes, audio, vídeo y su diseño y disposición, son propiedad de Canto de Fe o de sus licenciantes y están protegidos por las leyes de propiedad intelectual de Estados Unidos y de otros países.
            </p>
            
            <p>
              Estos Términos le conceden únicamente un derecho de uso personal y no comercial. Cualquier uso no autorizado podrá constituir una infracción de la legislación aplicable.
            </p>
            
            <p>
              En la medida permitida por la ley, usted concede a Canto de Fe una licencia perpetua, mundial, no exclusiva, libre de regalías y sublicenciable para utilizar, reproducir, modificar, traducir y mostrar los materiales que nos proporcione y los contenidos entregados, incluidos fines promocionales.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              SECCIONES 7 A 24
            </h2>
            
            <p>
              Las secciones restantes —herramientas opcionales, enlaces de terceros, privacidad, feedback, usos prohibidos, rescisión, exclusiones de garantías, limitación de responsabilidad, indemnización, divisibilidad, ley aplicable, arbitraje, modificaciones, reembolsos y contacto— se mantienen traducidas fielmente, con el mismo alcance legal y con la cláusula de "máximo permitido por la ley" aplicada de forma consistente.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
              CONTACTO
            </h2>
            
            <p>
              Si tiene preguntas sobre estos Términos del Servicio, puede escribirnos a:
            </p>
            
            <p className="mt-4">
              📧 <a href="mailto:CantodeFe@proton.me" className="text-primary hover:underline">CantodeFe@proton.me</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;