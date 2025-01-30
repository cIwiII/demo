## emotion

- 不具备模块化，只是利用 hash 值作为区分

<code src='../components/emotion_css_instance.tsx'>emotion-instance: 实例创建</code>

<code src='../components/emotion_css1.tsx'>emotion-css: 前缀默认 css</code>

<code src='../components/emotion_styled1.tsx'>emotion-styled：前缀默认 css</code>

<code src='../components/emotion_react1.tsx'>emotion-react：前缀默认 css</code>

### 组件样式覆写

组件样式的修改，如 Card 是 antd 的组件，修改它的样式

```ts
const ShadowCard = styled(Card)`
  width: 40rem;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
`

<ShadowCard>
    <button>切换到{isRegister ? '登录' : '注册'}</button>
</ShadowCard>



```
