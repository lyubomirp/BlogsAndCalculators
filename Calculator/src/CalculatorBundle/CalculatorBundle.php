<?php

namespace CalculatorBundle;

use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalculatorBundle extends Bundle
{
    public function buildForm(FormBuilderInterface $builder, array $option){
        $builder
            ->add('leftOperand', NumberType::class)
            ->add('rightOperand', NumberType::class)
            ->add('operator', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver){
        $resolver->setDefaults(array(
        'data_class' => "CalculatorBundle\Entity\Calculator",
    ));
    }
}
