import './ProfilePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Image } from 'react-bootstrap'
// import productsService from '../../services/products.service'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { ProductContext } from '../../contexts/products.context'
import conversationsService from '../../services/conversations.service'
import { useNavigate } from 'react-router-dom'


const ProfilePage = ({ conversations }) => {

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [userConversations, setUserConversations] = useState([])
    const { userProducts, favProducts, refreshAll } = useContext(ProductContext)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)



    const gotoChat = (id) => navigate(`/conversacion/${id}`)


    const fireFinalActions = () => {
        closeModal()
        refreshAll()


    }

    useEffect(() => {
        refreshAll()
    }, [])


    return (
        <>
            <div className='ProfilePage'>
                <Container>
                    <Row className='mt-4 mb-4'>

                        <Col >
                            <Image src={user.imageUrl} alt="user image" className='userimg' />

                        </Col>
                    </Row>

                    <Row>
                        <Col className='mb-5'>
                            <div className='text-center'>
                                <h1 className='text-center'>Productos en venta</h1>
                                <Button className='create' variant='outline-dark' onClick={openModal}>Crear Producto</Button>
                            </div>
                            <hr />

                            {!userProducts ? <Loader /> : <ProductsList products={userProducts} />}

                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Crear Producto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewProductForm fireFinalActions={fireFinalActions} /*setShowToast={setShowToast} setToastMessage={setToastMessage}*/ />
                                </Modal.Body>
                            </Modal>
                            <Row className='likedprod mb-5'>
                                <h1>Me interesa</h1>
                                <hr />
                                {!favProducts ? <Loader /> : <ProductsList products={favProducts} />}
                            </Row>

                            <Row className='mb-5'>
                                {userConversations.map(elm => {

                                    return (
                                        <>
                                            {console.log(elm)}
                                            < Col key={elm._id} >
                                                < Button variant='secondary' onClick={() => gotoChat(elm._id)} >
                                                    {elm.product}</Button>
                                            </Col>
                                        </>
                                    )
                                })}
                            </Row>

                        </Col>

                    </Row>
                </Container >
            </div >
        </>
    )
}

export default ProfilePage