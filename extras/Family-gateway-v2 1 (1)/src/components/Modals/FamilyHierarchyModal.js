import React from 'react'
import './modals.css';
import { Modal } from 'react-bootstrap';
import closeBtn from './img/close.svg';
import './familyhierarchy.css';
import { Tree, TreeNode } from 'react-organizational-chart';
import manIcon from '../../assets/images/man.svg';
import womanIcon from '../../assets/images/woman.svg';

const FamilyHierarchyModal = ({ hierarchyData, show, onHide }) => {

    function isEven(num) {
        return num % 2 === 0;
    }

    function FamilyTreeNode({ data, color }) {
        return (
            <TreeNode label={
                <div className='tree-node'>
                    <div className='tree-node-up'>
                        <div className='name'>
                            <span>{data.name}</span>
                        </div>
                    </div>
                    <div className={`tree-node-down ${color === 1 ? "color-orange" : "color-green"}`}>
                        <div className="sub-name">
                            {data.relation ? data.relation : ""}
                        </div>
                    </div>
                </div>
            }>
                {Object.values(data.children).map((child, index) => (
                    <FamilyTreeNode color={isEven(index) ? 1 : 2} key={child.name} data={child} />
                ))}
            </TreeNode>
        );
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='recommend-modal'
        >
            <Modal.Body>
                <img onClick={() => onHide()} className='close-icon' src={closeBtn} alt="closeBtn" />
                <div className='product-list'>
                    <h5>Family Hierarchy</h5>
                    <div className='tree-chart mt-3'>
                        {
                            Object.keys(hierarchyData).length > 0 &&
                            <Tree>

                                <FamilyTreeNode color={1} data={hierarchyData[Object.keys(hierarchyData)[0]]} />
                            </Tree>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    )
}

export default FamilyHierarchyModal